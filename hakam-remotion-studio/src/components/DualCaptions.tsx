import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from 'remotion';
import { createTikTokStyleCaptions, Caption } from '@remotion/captions';

const SWITCH_CAPTIONS_EVERY_MS = 1400;

export const DualCaptions: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile('captions.json'));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: Caption[] = await response.json();
      setCaptions(data);
      continueRender(handle);
    } catch (e) {
      continueRender(handle);
    }
  }, [continueRender, cancelRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions || captions.length === 0) return [];
    const { pages: tiktokPages } = createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    });
    return tiktokPages;
  }, [captions]);

  if (!captions || pages.length === 0) {
    return null;
  }

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * 30;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * 30 : Infinity,
          startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * 30
        );
        const durationInFrames = Math.max(1, Math.round(endFrame - startFrame));

        return (
          <Sequence
            key={index}
            from={Math.round(startFrame)}
            durationInFrames={durationInFrames}
          >
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const CaptionPage: React.FC<{ page: any }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  // Extract English translation from first token in page
  const englishText = page.tokens?.[0]?.textEn || page.tokens?.[0]?.text_en || "";

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '12px 30px',
        borderRadius: 22,
        background: 'rgba(13, 34, 41, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 210, 255, 0.5)',
        boxShadow: '0 12px 45px rgba(0, 0, 0, 0.75), 0 0 35px rgba(0, 210, 255, 0.25)',
        maxWidth: 1100,
        textAlign: 'center',
      }}
    >
      {/* ── TOP LINE: ARABIC SPOKEN CAPTION (RTL, Active Word Highlighted in Electric Cyan #00D2FF) ── */}
      <div
        style={{
          fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
          fontSize: 32,
          fontWeight: 900,
          color: '#FFFFFF',
          direction: 'rtl',
          letterSpacing: -0.3,
          lineHeight: 1.3,
          whiteSpace: 'pre-wrap',
        }}
      >
        {page.tokens.map((token: any) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{
                color: isActive ? '#00D2FF' : '#FFFFFF',
                textShadow: isActive
                  ? '0 0 22px rgba(0, 210, 255, 0.95), 0 0 12px #00D2FF'
                  : '0 2px 10px rgba(0, 0, 0, 0.8)',
                transition: 'color 0.1s ease, text-shadow 0.1s ease',
              }}
            >
              {token.text}{' '}
            </span>
          );
        })}
      </div>

      {/* ── BOTTOM LINE: ENGLISH TRANSLATION (LTR, Uppercase, Hakam Lime #BFFF00) ── */}
      {englishText && (
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 18,
            fontWeight: 800,
            color: '#BFFF00',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            direction: 'ltr',
            textShadow: '0 0 12px rgba(191, 255, 0, 0.6), 0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          {englishText}
        </div>
      )}
    </div>
  );
};
