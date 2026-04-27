import type { MetadataRoute } from 'next';
import { getPosts, postPathSegment } from '@lib/strapi';
import { getSiteUrl } from '@lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
  ];

  try {
    const { posts } = await getPosts({ pagination: { pageSize: 200 } });
    const blogEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
      url: `${base}/blog/${postPathSegment(post)}`,
      lastModified: new Date(
        post.updatedAt || post.publishedAt || Date.now()
      ),
    }));
    return [...staticEntries, ...blogEntries];
  } catch {
    return staticEntries;
  }
}
