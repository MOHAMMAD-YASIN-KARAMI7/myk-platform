'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center gap-6"
        >
          {/* Logo/Branding */}
          <motion.div
            variants={textVariants}
            custom={0}
            className="relative"
          >
            <div className="glass-effect px-4 py-2 inline-block">
              <span className="text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                MYK Platform
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={textVariants}
            custom={1}
            className="heading-1 max-w-4xl leading-tight"
          >
            Mohammad Yasin Karami
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={textVariants}
            custom={2}
            className="text-xl md:text-2xl text-muted max-w-2xl font-light"
          >
            AI Engineer • Python Developer • Entrepreneur
          </motion.p>

          {/* Main Slogan */}
          <motion.div
            variants={textVariants}
            custom={3}
            className="mt-4"
          >
            <p className="text-lg md:text-xl font-semibold gradient-text max-w-xl">
              Building Tomorrow with Artificial Intelligence
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={textVariants}
            custom={4}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link
              href="#projects"
              className="button-primary inline-flex items-center justify-center gap-2 group"
            >
              View Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-flex items-center justify-center"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={textVariants}
            custom={5}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
