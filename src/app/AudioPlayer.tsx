import React from 'react';

interface AudioPlayerProps {
  audioURL: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioURL }) => {
  return (
    <div>
      <audio controls src={audioURL}></audio>
    </div>
  );
};

export default AudioPlayer;