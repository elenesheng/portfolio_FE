import { getImageFormat } from '@lib/image-utils';
import { getSiteUrl } from '@lib/site';
import type { StrapiPost } from '@lib/types';

type Props = {
  post: StrapiPost;
  canonicalPath: string;
};

export function ArticleJsonLd({ post, canonicalPath }: Props) {
  const site = getSiteUrl();
  const url = `${site}${canonicalPath}`;
  const imageUrl = getImageFormat(post, 'large');
  const images =
    imageUrl && !imageUrl.endsWith('placeholder.svg')
      ? [imageUrl.startsWith('http') ? imageUrl : `${site}${imageUrl}`]
      : undefined;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Elene Shengelia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elene Shengelia',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  };

  if (images) schema.image = images;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
