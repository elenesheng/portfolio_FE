// Strapi API types
export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: number;
    documentId: string;
    title: string;
    description: string | null;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
  cover: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: null | string;
    caption: null | string;
    formats: {
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        url: string;
        path: null | string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        url: string;
        path: null | string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        url: string;
        path: null | string;
      };
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        url: string;
        path: null | string;
      };
    };
  } | null;
}
