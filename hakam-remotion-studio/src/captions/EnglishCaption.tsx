import React from 'react';

interface EnglishCaptionProps {
  englishText: string;
}

export const EnglishCaption: React.FC<EnglishCaptionProps> = ({ englishText }) => {
  if (!englishText) return null;

  return (
    <div
      style={{
        direction: 'ltr',
        unicodeBidi: 'plaintext',
        textAlign: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 17,
        fontWeight: 800,
        color: '#BFFF00',
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        lineHeight: 1.3,
        textShadow: '0 0 12px rgba(191, 255, 0, 0.6), 0 2px 8px rgba(0,0,0,0.9)',
        margin: 0,
        padding: 0,
      }}
    >
      {englishText}
    </div>
  );
};
