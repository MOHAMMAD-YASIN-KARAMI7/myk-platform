'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact-form';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export function ContactPage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full overflow-x-hidden"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
        <div className="container">
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-4">Get In Touch</h1>
            <p className="text-xl text-muted">
              Have a question, project idea, or just want to chat? I'd love to hear from you.
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section variants={itemVariants} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-effect p-8 md:p-12">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section variants={itemVariants} className="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 text-center mb-12">Other Ways to Connect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-6 text-center"
              >
                <h3 className="heading-3 text-lg mb-2">Email</h3>
                <a
                  href="mailto:contact@myk-platform.com"
                  className="text-accent hover:opacity-80 transition-opacity"
                >
                  contact@myk-platform.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-6 text-center"
              >
                <h3 className="heading-3 text-lg mb-2">Social</h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/MOHAMMAD-YASIN-KARAMI7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
}
