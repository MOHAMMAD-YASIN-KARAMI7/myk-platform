'use client';

import { motion } from 'framer-motion';

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

export function Introduction() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={itemVariants}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-effect p-8 md:p-12">
            <h2 className="heading-2 mb-6">Welcome</h2>
            <p className="text-lg text-muted leading-relaxed mb-4">
              I'm a passionate AI engineer and Python developer with a deep interest in
              building intelligent systems that solve real-world problems. With years of
              experience in software development and AI/ML, I've worked on various projects
              ranging from machine learning models to full-stack web applications.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              This platform is my digital home where I share my projects, insights, and
              ideas. Here you'll find a collection of my work, technical articles, and
              ways to collaborate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
