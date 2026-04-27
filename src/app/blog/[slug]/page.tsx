import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ArticleJsonLd } from '@components/article-json-ld';
import { BlogShareLinks } from '@components/blog-share-links';
import { RichTextWithImageLightbox } from '@components/rich-text-with-image-lightbox';
import { getPost, prepareStrapiRichTextHtml } from '@lib/strapi';
import { getImageFormat } from '@lib/image-utils';
import { getSiteUrl } from '@lib/site';
import './blog-content.css';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Post' };
  }
  const site = getSiteUrl();
  const path = `/blog/${params.slug}`;
  const canonical = `${site}${path}`;
  const imageUrl = getImageFormat(post, 'large');
  let ogImage: string | undefined;
  if (imageUrl.startsWith('http')) {
    ogImage = imageUrl;
  } else if (
    imageUrl.startsWith('/') &&
    !imageUrl.includes('placeholder.svg')
  ) {
    ogImage = `${site}${imageUrl}`;
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: canonical,
      siteName: 'Elene Shengelia',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: ogImage ? [{ url: ogImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await getPost(slug);
  if (!post) {
    notFound();
  }
  const bodyHtml = prepareStrapiRichTextHtml(post.content || '');
  const site = getSiteUrl();
  const canonicalPath = `/blog/${slug}`;
  const canonicalUrl = `${site}${canonicalPath}`;
  const date = new Date(
    post?.publishedAt || post?.createdAt
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <ArticleJsonLd post={post} canonicalPath={canonicalPath} />
      <Link
        href="/blog"
        className="text-amber-700 hover:text-amber-900 flex items-center gap-2 mb-8"
      >
        <ArrowLeft size={16} />
        <span>Back to blog</span>
      </Link>

      <div className="mb-8">
        <div className="text-sm text-amber-700 mb-2 font-mono">{date}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 font-serif">
          {post.title}
        </h1>
        <p className="text-lg text-amber-800 mb-6">{post.excerpt}</p>
        <BlogShareLinks
          url={canonicalUrl}
          title={post.title}
          excerpt={post.excerpt}
        />
      </div>

      <RichTextWithImageLightbox html={bodyHtml} />
    </div>
  );
}
