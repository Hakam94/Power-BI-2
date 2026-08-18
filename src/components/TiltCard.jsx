import React, { useRef } from 'react';

/**
 * Wraps children in a card that tilts in 3D toward the cursor and carries a
 * soft light "glare" that follows it — the mouse-follow depth effect used
 * across premium product sites. Pure CSS transforms driven by pointer
 * position, so it stays cheap even with many cards on screen at once.
 */
export default function TiltCard({ children, className = '', max = 10, glare = true }) {
  const ref = useRef(null);
  const frame = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.style.setProperty('--glare-x', `${px * 100}%`);
      card.style.setProperty('--glare-y', `${py * 100}%`);
      card.style.setProperty('--glare-opacity', '1');
    });
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.setProperty('--glare-opacity', '0');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transformStyle: 'preserve-3d' }}
    >
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--glare-opacity,0)] transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x,50%) var(--glare-y,50%), rgba(255,255,255,0.12), transparent 55%)',
          }}
        />
      )}
      {children}
    </div>
  );
}
