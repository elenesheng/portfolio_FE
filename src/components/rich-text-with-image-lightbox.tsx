'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@lib/utils';

const cardProseClass =
  "prose prose-amber max-w-none bg-amber-50 p-8 rounded-lg shadow-md bg-[url('/images/vintage-paper-texture.png')] bg-repeat blog-content";

const embeddedProseClass = 'prose prose-amber max-w-none blog-content';

type Props = {
  html: string;
  className?: string;
  /** Use inside an existing card — no second paper background / padding */
  embedded?: boolean;
};

export function RichTextWithImageLightbox({
  html,
  className,
  embedded,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      e.preventDefault();
      setLightbox({
        src: target.currentSrc || target.src,
        alt: target.alt || '',
      });
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [html]);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          embedded ? embeddedProseClass : cardProseClass,
          '[&_img]:cursor-zoom-in [&_img]:transition-opacity hover:[&_img]:opacity-95',
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-amber-100 p-2 text-amber-900 shadow-md ring-1 ring-amber-300 transition hover:bg-amber-200"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
          >
            <X size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size CMS URL, dynamic lightbox */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[min(90vh,100%)] max-w-[min(95vw,100%)] rounded-lg border-4 border-amber-200 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
