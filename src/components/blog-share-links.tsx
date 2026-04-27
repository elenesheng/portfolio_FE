/** Share targets — no npm package; these are the official web intent URLs. */

import {
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
} from '@lib/share';

function IconX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7.5v.01M12 17v-4.5a2 2 0 0 1 4 0V17" />
    </svg>
  );
}

const btnClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-amber-900 bg-[#fffbeb] text-amber-950 shadow-[3px_3px_0_0_#78350f] transition hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800';

type Props = {
  url: string;
  title: string;
  /** Shown in the X compose box; LinkedIn still uses Open Graph on `url` for preview. */
  excerpt?: string | null;
};

export function BlogShareLinks({ url, title, excerpt }: Props) {
  const twitterHref = buildTwitterShareUrl(url, title, excerpt);
  const linkedInHref = buildLinkedInShareUrl(url);

  return (
    <aside
      className="not-prose my-6 border-y-2 border-amber-800/25 py-5"
      aria-label="Share this article"
      id="share"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber-800">
        Share this article
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
          aria-label="Share on X (Twitter)"
        >
          <IconX className="h-5 w-5" />
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
          aria-label="Share on LinkedIn"
        >
          <IconLinkedIn className="h-5 w-5" />
        </a>
      </div>
    </aside>
  );
}
