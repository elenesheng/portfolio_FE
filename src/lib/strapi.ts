/**
 * Strapi API utility functions for content fetching
 */
import { StrapiPost } from './types';

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

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
    console.log(requestUrl);

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
      posts: data as StrapiPost[],
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
    const { data } = await fetchAPI('/blogs', {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: '*',
    });

    return data?.[0] || null;
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
