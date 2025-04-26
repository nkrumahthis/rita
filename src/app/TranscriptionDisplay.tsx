import React from 'react';

interface TranscriptionDisplayProps {
  transcription: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ transcription }) => {
  return (
    <div>
      <h2>Transcription:</h2>
      <p>{transcription}</p>
    </div>
  );
};

export default TranscriptionDisplay;