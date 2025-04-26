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

        const result = await transcribe(audioBlob);
        if (result) {
          setTranscription(result);
          const verses = await findBibleVerses(result);
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
      <RecorderControls
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
      {audioURL && <AudioPlayer audioURL={audioURL} />}
      {transcription && <TranscriptionDisplay transcription={transcription} />}
      {bibleVerses && <BibleVersesDisplay bibleVerses={bibleVerses} />}
    </div>
  );
};

export default InformationAssistant;