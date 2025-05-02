import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getPost } from '@lib/strapi';
import { StrapiPost } from '@lib/types';
import { getImageFormat } from '@lib/image-utils';
import './blog-content.css';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const imageUrl = getImageFormat(post, 'large');
  const date = new Date(
    post?.publishedAt || post?.createdAt
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
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
        <p className="text-lg text-amber-800 mb-8">{post.excerpt}</p>
      </div>

      {imageUrl && (
        <div className="relative h-[400px] mb-8 overflow-hidden rounded-lg bg-amber-100 bg-[url('/images/vintage-paper-texture.png')] bg-repeat">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-contain p-4"
          />
        </div>
      )}

      <div
        className="prose prose-amber max-w-none bg-amber-50 p-8 rounded-lg shadow-md bg-[url('/images/vintage-paper-texture.png')] bg-repeat blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
