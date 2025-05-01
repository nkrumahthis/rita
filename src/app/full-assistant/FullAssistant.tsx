"use client"

import React, { useEffect, useState } from 'react';
import { EventEmitter } from "events";
import { requestEphemeralKey } from './actions';

let ws: WebSocket | null = null;
const wsEvents = new EventEmitter();

function FullAssistant() {
  const [isConnected, setIsConnected] = useState(false);
  const [transcription, setTranscription] = useState<string>("");

  const connect = async () => {
    if (ws) return;

    try {
      const key = await requestEphemeralKey();
      ws = new WebSocket(`wss://api.openai.com/v1/audio/transcriptions?key=${key}`);

      ws.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.text) {
          setTranscription((prev) => prev + data.text + " ");
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        ws = null;
        console.log("WebSocket connection closed.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={connect}>
        Connect
      </button>

      <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={disconnect}>
        Disconnect
      </button>

      {isConnected ? (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow">
          Connected to server.
        </div>
      ) : (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow">
          Disconnected from server.
        </div>
      )}

      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h2 className="text-lg font-bold">Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </>
  );
}

export default FullAssistant;