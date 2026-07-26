import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/utils/metadata';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContactPage } from '@/features/contact';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Mohammad Yasin Karami. Have a project idea or want to collaborate? Send me a message.',
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
