import { StrapiPost } from './types';

// Function to get image URL from the specific format
export function getImageFormat(
  post: StrapiPost,
  format: 'large' | 'medium' | 'small' | 'thumbnail' = 'medium'
) {
  if (!post.cover || !post.cover.formats) {
    return '/placeholder.svg';
  }

  // Get the requested format or fall back to another available format
  const formatData =
    post.cover.formats[format] ||
    post.cover.formats.medium ||
    post.cover.formats.small ||
    post.cover.formats.thumbnail;

  if (!formatData) {
    return post.cover?.formats?.medium?.url || '/placeholder.svg';
  }

  const imageUrl = formatData.url;
  if (imageUrl.startsWith('/')) {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    }${imageUrl}`;
  }

  return imageUrl;
}
