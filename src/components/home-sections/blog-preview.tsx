import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getPosts, getStrapiMedia } from '@lib/strapi';
import { StrapiPost } from '@lib/types';
import { getImageFormat } from '@lib/image-utils';

async function getLatestPosts() {
  const { posts } = await getPosts({
    pagination: {
      limit: 3,
    },
    populate: '*',
  });

  return posts || [];
}

export default async function BlogPreview() {
  const posts = await getLatestPosts();

  if (!posts.length) {
    return (
      <section id="blog" className="py-16 md:py-24 container mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1 bg-amber-200 rounded-full text-amber-800 font-mono text-sm">
            My Articles
          </div>
          <h2 className="text-4xl font-bold text-amber-900 font-serif">
            Latest From The Blog
          </h2>
          <p className="text-lg text-amber-800">
            No blog posts found. Check back soon!
          </p>
          <div className="pt-8">
            <Link href="/blog">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                View All Articles
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 md:py-24 container mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
        <div className="inline-block px-4 py-1 bg-amber-200 rounded-full text-amber-800 font-mono text-sm">
          My Articles
        </div>
        <h2 className="text-4xl font-bold text-amber-900 font-serif">
          Latest From The Blog
        </h2>
        <p className="text-lg text-amber-800">
          Thoughts, ideas, and insights about web development, design, and
          technology.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-20">
        {posts.map((post: StrapiPost) => {
          const { id, title, excerpt } = post;

          const imageUrl = getImageFormat(post, 'small');

          return (
            <div key={id}>
              <Link href={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden border-amber-200 hover:border-amber-400 transition-colors duration-300">
                  <div className="relative h-64 overflow-hidden bg-amber-100 bg-[url('/images/vintage-paper-texture.png')] bg-repeat">
                    {post.category && (
                      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-2">
                        <Badge className="bg-rose-600 hover:bg-rose-700 text-white rounded-sm px-2 py-1">
                          {post.category.title}
                        </Badge>
                      </div>
                    )}
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 bg-amber-50">
                    <div className="text-sm text-amber-700 mb-2 font-mono">
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
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

      <div className="mt-12 text-center">
        <Link href="/blog">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 text-lg">
            View All Articles
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
