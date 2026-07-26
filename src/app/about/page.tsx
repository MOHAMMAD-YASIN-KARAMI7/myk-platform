import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/utils/metadata';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutPage } from '@/features/about';

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description:
    'Learn about Mohammad Yasin Karami - AI Engineer, Python Developer, and Entrepreneur. Discover my journey, skills, and vision.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
