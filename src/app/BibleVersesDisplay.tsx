import React from 'react';

interface BibleVersesDisplayProps {
  bibleVerses: string;
}

const BibleVersesDisplay: React.FC<BibleVersesDisplayProps> = ({ bibleVerses }) => {
  return (
    <div>
      <h2>Related Bible Verses:</h2>
      <p>{bibleVerses}</p>
    </div>
  );
};

export default BibleVersesDisplay;