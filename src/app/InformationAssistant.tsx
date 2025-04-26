'use client'

import React, { useState, useRef } from 'react';
import { transcribe, findBibleVerses } from './action';
import RecorderControls from './RecorderControls';
import AudioPlayer from './AudioPlayer';
import TranscriptionDisplay from './TranscriptionDisplay';
import BibleVersesDisplay from './BibleVersesDisplay';

const InformationAssistant: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [bibleVerses, setBibleVerses] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFindingVerses, setIsFindingVerses] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];

        setIsTranscribing(true);
        const result = await transcribe(audioBlob);
        setIsTranscribing(false);

        if (result) {
          setTranscription(result);

          setIsFindingVerses(true);
          const verses = await findBibleVerses(result);
          setIsFindingVerses(false);

          if (verses) {
            setBibleVerses(verses);
          } else {
            console.error('Failed to find related Bible verses');
          }
        } else {
          console.error('Transcription failed');
        }
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
      {isTranscribing && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow">
          Transcribing audio...
        </div>
      )}

      {isFindingVerses && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow">
          Finding related Bible verses...
        </div>
      )}

      <RecorderControls
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      {/* {audioURL && <AudioPlayer audioURL={audioURL} />} */}
      {transcription && <TranscriptionDisplay transcription={transcription} />}
      {bibleVerses && <BibleVersesDisplay bibleVerses={bibleVerses} />}
    </div>
  );
};

export default InformationAssistant;