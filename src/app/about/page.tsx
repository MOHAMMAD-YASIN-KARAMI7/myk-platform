import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutPage } from '@/features/about';

export default function Page() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
