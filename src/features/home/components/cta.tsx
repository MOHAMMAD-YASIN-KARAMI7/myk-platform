'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="heading-2 mb-4">Let's Create Something Amazing</h2>
          <p className="text-lg text-muted mb-8">
            Whether you have a project in mind or just want to chat about technology,
            AI, or entrepreneurship, I'd love to hear from you.
          </p>
          <Link href="/contact" className="button-primary inline-flex items-center">
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
