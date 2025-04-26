import React, { useEffect } from 'react';

interface RecorderControlsProps {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

const RecorderControls: React.FC<RecorderControlsProps> = ({
  isRecording,
  startRecording,
  stopRecording,
}) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isRecording) {
                    startRecording();
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (isRecording) {
                    stopRecording();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="flex justify-center">
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
    </div>
  );
};

export default RecorderControls;