import React from 'react';

interface BibleVersesDisplayProps {
  bibleVerses: string;
}

const BibleVersesDisplay: React.FC<BibleVersesDisplayProps> = ({ bibleVerses }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className='text-lg font-bold text-center'>Related Bible Verses:</h2>
      <p>{bibleVerses}</p>
    </div>
  );
};

export default BibleVersesDisplay;