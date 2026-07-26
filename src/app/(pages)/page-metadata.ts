import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/utils/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Home',
  description:
    'Welcome to MYK Platform. Discover projects, expertise, and innovations from Mohammad Yasin Karami - AI Engineer and Full-Stack Developer.',
  path: '/',
});

export default function Page() {
  return null;
}
