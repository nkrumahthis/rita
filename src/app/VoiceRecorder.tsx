'use client'

import React, { useState, useRef } from 'react';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h1>Voice Recorder</h1>
      <button
        className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200 flex items-center gap-2"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <>
            <span className="inline-block w-3 h-3 bg-white rounded-sm"></span>
            Stop Recording
          </>
        ) : (
          <>
            <span className="inline-block w-3 h-3 bg-white rounded-full animate-pulse"></span>
            Start Recording
          </>
        )}
      </button>
      {audioURL && (
        <div>
          <h2>Recording:</h2>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;