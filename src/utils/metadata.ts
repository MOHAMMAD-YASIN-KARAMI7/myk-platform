import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myk-platform.com';
const siteName = 'MYK Platform';
const defaultDescription =
  'Mohammad Yasin Karami - AI Engineer, Python Developer, and Entrepreneur. Premium personal platform.';
const defaultImage = `${baseUrl}/og-image.png`;

export interface PageMetadataConfig {
  title: string;
  description: string;
  image?: string;
  path?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateMetadata(config: PageMetadataConfig): Metadata {
  const {
    title,
    description,
    image = defaultImage,
    path = '',
    canonical = `${baseUrl}${path}`,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors = ['Mohammad Yasin Karami'],
    tags = [],
  } = config;

  const fullTitle = `${title} | ${siteName}`;
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...tags,
      'AI Engineer',
      'Python Developer',
      'Full Stack',
      'Software Development',
      'Mohammad Yasin Karami',
    ],
    authors: authors.map((author) => ({
      name: author,
    })),
    creator: 'Mohammad Yasin Karami',
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      siteName,
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@MohamadYasn',
    },
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateJsonLD(data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': baseUrl,
    name: 'Mohammad Yasin Karami',
    url: baseUrl,
    image: `${baseUrl}/avatar.png`,
    description: defaultDescription,
    email: 'contact@myk-platform.com',
    sameAs: [
      'https://github.com/MOHAMMAD-YASIN-KARAMI7',
      'https://linkedin.com/in/mohammad-yasin-karami',
      'https://twitter.com/MohamadYasn',
    ],
    jobTitle: ['AI Engineer', 'Python Developer', 'Entrepreneur'],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Python',
      'JavaScript',
      'React',
      'Node.js',
      'Full Stack Development',
    ],
    ...data,
  };
}

export function generateArticleSchema(data: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image || defaultImage,
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime || data.publishedTime,
    author: {
      '@type': 'Person',
      name: data.author || 'Mohammad Yasin Karami',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { label: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  };
}
