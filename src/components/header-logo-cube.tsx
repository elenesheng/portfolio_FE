'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

const SIZE = 30;
const HALF = SIZE / 2;
const FACE = 'absolute left-0 top-0 box-border bg-[#FFFBEB] border-2 border-[#B45309]';
const SENS = 0.45;

export function HeaderLogoCube() {
  const [rx, setRx] = useState(-22);
  const [ry, setRy] = useState(32);
  const dragRef = useRef<{
    id: number;
    x: number;
    y: number;
    rx: number;
    ry: number;
  } | null>(null);
  const movedRef = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    movedRef.current = false;
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      rx,
      ry,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [rx, ry]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) movedRef.current = true;
    setRy(d.ry + dx * SENS);
    setRx(d.rx - dy * SENS);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (movedRef.current) {
      e.preventDefault();
      movedRef.current = false;
    }
  }, []);

  const cubeStyle: React.CSSProperties = {
    width: SIZE,
    height: SIZE,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
  };

  const face = (t: string): React.CSSProperties => ({
    width: SIZE,
    height: SIZE,
    transform: t,
    transformOrigin: 'center center',
    backfaceVisibility: 'hidden',
  });

  return (
    <Link
      href="/"
      onClick={onLinkClick}
      aria-label="Home"
      className="flex shrink-0 select-none items-center justify-center overflow-visible py-1 outline-none touch-manipulation"
    >
      <div
        className="cursor-grab active:cursor-grabbing"
        style={{ perspective: 220 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div style={cubeStyle}>
          <div
            className={FACE}
            style={face(`translateZ(${HALF}px)`)}
            aria-hidden
          />
          <div
            className={FACE}
            style={face(`rotateY(180deg) translateZ(${HALF}px)`)}
            aria-hidden
          />
          <div
            className={FACE}
            style={face(`rotateY(90deg) translateZ(${HALF}px)`)}
            aria-hidden
          />
          <div
            className={FACE}
            style={face(`rotateY(-90deg) translateZ(${HALF}px)`)}
            aria-hidden
          />
          <div
            className={FACE}
            style={face(`rotateX(90deg) translateZ(${HALF}px)`)}
            aria-hidden
          />
          <div
            className={FACE}
            style={face(`rotateX(-90deg) translateZ(${HALF}px)`)}
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
