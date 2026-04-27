/**
 * Strapi API utility functions for content fetching
 */
import { StrapiPost } from './types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

/** Strapi v4 entries are `{ id, attributes }`; v5 REST is flat on the entry. */
function normalizeBlogEntry(raw: unknown): StrapiPost | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Record<string, unknown>;
  if (row.attributes && typeof row.attributes === 'object') {
    const attrs = row.attributes as Record<string, unknown>;
    return { ...attrs, id: row.id as number } as StrapiPost;
  }
  return raw as StrapiPost;
}

function normalizeBlogList(data: unknown): StrapiPost[] {
  if (!Array.isArray(data)) return [];
  return data
    .map(normalizeBlogEntry)
    .filter((x): x is StrapiPost => x != null);
}

/** Use in routes when `slug` is optional in Strapi but `documentId` is always set. */
export function postPathSegment(post: StrapiPost): string {
  const slug = post.slug?.trim();
  if (slug) return slug;
  if (post.documentId) return post.documentId;
  return String(post.id);
}

const UPLOADS = '/uploads/';

/**
 * Strapi rich text often emits media as `/uploads/...`.
 * Browsers resolve that against the Next.js host, so images 404 unless we prefix the Strapi URL.
 */
export function rewriteStrapiMediaUrlsInHtml(html: string): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, '') ?? '';
  if (!html || !base) return html;

  const abs = `${base}${UPLOADS}`;
  let out = html;
  while (out.includes(`"${UPLOADS}`)) {
    out = out.split(`"${UPLOADS}`).join(`"${abs}`);
  }
  while (out.includes(`'${UPLOADS}`)) {
    out = out.split(`'${UPLOADS}`).join(`'${abs}`);
  }
  while (out.includes(`, ${UPLOADS}`)) {
    out = out.split(`, ${UPLOADS}`).join(`, ${abs}`);
  }
  while (out.includes(`url(${UPLOADS}`)) {
    out = out.split(`url(${UPLOADS}`).join(`url(${abs}`);
  }
  while (out.includes(`url("${UPLOADS}`)) {
    out = out.split(`url("${UPLOADS}`).join(`url("${abs}`);
  }
  while (out.includes(`url('${UPLOADS}`)) {
    out = out.split(`url('${UPLOADS}`).join(`url('${abs}`);
  }
  return out;
}

const MEDIA_TAG = /<\s*(img|video|iframe|object|svg|picture|canvas)\b/i;

/** True if inner HTML has no visible text after stripping tags/spacers (TinyMCE ghost paragraphs). */
function isSpacerOnlyParagraphInner(inner: string): boolean {
  if (MEDIA_TAG.test(inner)) return false;
  const textOnly = inner
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, '')
    .replace(/&#160;/gi, '')
    .replace(/&#x0*a0;/gi, '')
    .replace(/&#8203;/gi, '')
    .replace(/&ZeroWidthSpace;/gi, '')
    .replace(/\u00a0|\u200b|\uFEFF/g, '')
    .replace(/\s+/g, '');
  return textOnly.length === 0;
}

/**
 * Removes <p>…</p> that only contain &nbsp;, ZWSP, <br>, etc. Editors insert these
 * for layout; they are not "empty" for CSS :empty so prose margins still stack.
 */
export function collapseStrapiSpacerParagraphs(html: string): string {
  if (!html) return html;
  return html.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (full, inner: string) =>
    isSpacerOnlyParagraphInner(inner) ? '' : full
  );
}

/** Upload URL rewrite + spacer paragraph removal for Strapi rich text HTML. */
export function prepareStrapiRichTextHtml(html: string): string {
  return collapseStrapiSpacerParagraphs(rewriteStrapiMediaUrlsInHtml(html));
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMedia {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: StrapiPagination;
  };
}

export interface AboutMe {
  id: number;
  Title: string;
  Content: string;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Record<string, any>} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
) {
  const mergedOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    ...options,
  };

  const serializeQueryParams = (obj: Record<string, any>, prefix = '') => {
    const str: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const encodedKey = prefix
          ? `${prefix}[${encodeURIComponent(key)}]`
          : encodeURIComponent(key);
        if (
          typeof value === 'object' &&
          !Array.isArray(value) &&
          value !== null
        ) {
          str.push(...serializeQueryParams(value, encodedKey));
        } else {
          str.push(`${encodedKey}=${encodeURIComponent(value)}`);
        }
      }
    }
    return str;
  };

  const queryString = serializeQueryParams(urlParamsObject).join('&');
  const requestUrl = `${API_URL}/api${path}${
    queryString ? `?${queryString}` : ''
  }`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      return {
        data: null,
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: null,
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    };
  }
}

/**
 * Get all posts from Strapi
 * @param {Record<string, any>} params Optional parameters for filtering and pagination
 * @returns Array of posts
 */
export async function getPosts(params: Record<string, any> = {}) {
  try {
    const { data, meta } = await fetchAPI('/blogs', {
      populate: '*',
      sort: 'publishedAt:desc',
      ...params,
    });

    return {
      posts: normalizeBlogList(data),
      pagination: meta?.pagination || {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0,
      },
    };
  } catch (error) {
    return {
      posts: [] as StrapiPost[],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
    };
  }
}

/**
 * Get a specific post from Strapi by slug
 * @param {string} slug Post slug
 * @returns Post data
 */
export async function getPost(slug: string): Promise<StrapiPost | null> {
  try {
    const bySlug = await fetchAPI('/blogs', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
    });

    let list = normalizeBlogList(bySlug.data);
    if (!list.length) {
      const byDoc = await fetchAPI('/blogs', {
        filters: {
          documentId: {
            $eq: slug,
          },
        },
        populate: '*',
      });
      list = normalizeBlogList(byDoc.data);
    }

    return list[0] ?? null;
  } catch (error) {
    return null;
  }
}

/**
 * Get all categories from Strapi
 * @returns Array of categories
 */
export async function getCategories() {
  try {
    const { data } = await fetchAPI('/categories', {
      sort: 'name:asc',
    });

    return data || [];
  } catch (error) {
    return [];
  }
}

/**
 * Parse Strapi Media URL
 * @param {StrapiMedia} media Strapi media object
 * @returns Full URL for the media asset
 */
export function getStrapiMedia(media: StrapiMedia | null) {
  if (!media) return null;

  const { url } = media.data.attributes;
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

/**
 * Get About Me from Strapi
 * @returns About Me data
 */
export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const { data } = await fetchAPI('/about-section', { populate: '*' });

    return data || null;
  } catch (error) {
    return null;
  }
}
