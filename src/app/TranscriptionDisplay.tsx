import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ transcription }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className="text-lg font-bold text-center">Transcription:</h2>
      <p>{transcription}</p>
    </div>
  );
};

export default TranscriptionDisplay;