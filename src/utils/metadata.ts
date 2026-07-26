import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myk-platform.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'MYK Platform';
const description =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'Premium personal platform for Mohammad Yasin Karami';
const defaultImage = `${baseUrl}/og-image.png`;

export function generateMetadata({
  title,
  description: pageDescription,
  image = defaultImage,
  path = '',
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description: pageDescription,
    keywords: ['Mohammad Yasin Karami', 'AI Engineer', 'Python Developer'],
    authors: [
      {
        name: 'Mohammad Yasin Karami',
        url: baseUrl,
      },
    ],
    creator: 'Mohammad Yasin Karami',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: fullTitle,
      description: pageDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageDescription,
      images: [image],
      creator: '@MohamadYasn',
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateJsonLD(data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Yasin Karami',
    url: baseUrl,
    image: `${baseUrl}/avatar.png`,
    description,
    sameAs: [
      'https://github.com/MOHAMMAD-YASIN-KARAMI7',
      'https://linkedin.com/in/mohammad-yasin-karami',
    ],
    ...data,
  };
}
