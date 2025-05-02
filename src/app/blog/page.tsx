import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { getPosts, getStrapiMedia } from '@lib/strapi';
import { StrapiPost } from '@lib/types';
import { getImageFormat } from '@lib/image-utils';

export const metadata = {
  title: 'Blog | Elene Shengelia',
  description: 'Read the latest articles and insights',
};

async function getAllPosts() {
  const { posts } = await getPosts({
    pagination: {
      pageSize: 100,
    },
  });

  return posts || [];
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (!posts.length) {
    return (
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-4xl font-serif font-bold mb-8 text-amber-900">
          Blog
        </h1>
        <div className="text-center py-12 bg-amber-50 rounded-lg">
          <p className="text-amber-700">
            No blog posts found. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-serif font-bold mb-8 text-amber-900">
        Blog
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: StrapiPost) => {
          const { id, title, excerpt, slug, publishedAt, createdAt } = post;
          const imageUrl = getImageFormat(post, 'small');

          const date = new Date(publishedAt || createdAt).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          );

          return (
            <div key={id}>
              <Link href={`/blog/${slug}`} className="group">
                <Card className="overflow-hidden border-amber-200 hover:border-amber-400 transition-colors duration-300">
                  <div className="relative h-64 overflow-hidden bg-amber-100 bg-[url('/images/vintage-paper-texture.png')] bg-repeat">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 bg-amber-50">
                    <div className="text-sm text-amber-700 mb-2 font-mono">
                      {date}
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-rose-600 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-amber-800">{excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
