'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Hero } from '../components/hero';
import { Introduction } from '../components/introduction';
import { Skills } from '../components/skills';
import { Vision } from '../components/vision';
import { CTA } from '../components/cta';

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

export function HomePage() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full overflow-x-hidden"
    >
      <motion.section variants={itemVariants}>
        <Hero />
      </motion.section>

      <motion.section variants={itemVariants}>
        <Introduction />
      </motion.section>

      <motion.section variants={itemVariants}>
        <Skills />
      </motion.section>

      <motion.section variants={itemVariants}>
        <Vision />
      </motion.section>

      <motion.section variants={itemVariants}>
        <CTA />
      </motion.section>
    </motion.main>
  );
}
