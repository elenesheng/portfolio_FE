/**
 * Official share URLs. LinkedIn / X read title, image, and excerpt from your page’s
 * Open Graph tags after opening — they are not passed in the query string.
 * @see https://www.linkedin.com/help/linkedin/answer/a521928
 */

function assertHttpUrl(pageUrl: string): void {
  const u = new URL(pageUrl);
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error(`Invalid share URL protocol: ${pageUrl}`);
  }
}

/** LinkedIn “share offsite” — `url` must be a single, absolute, encoded page URL. */
export function buildLinkedInShareUrl(pageUrl: string): string {
  assertHttpUrl(pageUrl);
  const u = new URL('https://www.linkedin.com/sharing/share-offsite/');
  u.searchParams.set('url', pageUrl);
  return u.href;
}

/** X (Twitter) web intent — `text` is optional prefill; preview still uses OG on the link. */
export function buildTwitterShareUrl(
  pageUrl: string,
  title: string,
  excerpt?: string | null
): string {
  assertHttpUrl(pageUrl);
  const u = new URL('https://twitter.com/intent/tweet');
  u.searchParams.set('url', pageUrl);
  const lines = [title.trim()];
  if (excerpt?.trim()) {
    const short =
      excerpt.trim().length > 200
        ? `${excerpt.trim().slice(0, 197)}…`
        : excerpt.trim();
    lines.push(short);
  }
  let text = lines.join('\n\n');
  if (text.length > 260) text = `${text.slice(0, 257)}…`;
  u.searchParams.set('text', text);
  return u.href;
}
