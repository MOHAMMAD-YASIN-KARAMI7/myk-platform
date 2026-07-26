import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ContactPage } from '@/features/contact';

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
