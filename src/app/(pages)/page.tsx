import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HomePage } from '@/features/home';

export default function Page() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}
