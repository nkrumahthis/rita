import React from 'react';

interface BibleVersesDisplayProps {
  bibleVerses: string[];
}

const BibleVersesDisplay: React.FC<BibleVersesDisplayProps> = ({ bibleVerses }) => {
  if (!bibleVerses || bibleVerses.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <h2 className="text-lg font-bold text-center">Verses:</h2>
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        {bibleVerses.map((verse, index) => (
          <p key={index} className="text-gray-100">
            {verse}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BibleVersesDisplay;