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

export function Vision() {
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
          <h2 className="heading-2 mb-6">Vision & Future</h2>
          <div className="space-y-4 text-lg text-muted leading-relaxed">
            <p>
              My vision is to create impactful solutions that leverage artificial
              intelligence to solve complex problems. I believe in the power of technology
              to transform industries and improve lives.
            </p>
            <p>
              I'm constantly learning, experimenting, and pushing the boundaries of what's
              possible with AI and software development. This platform will evolve to
              showcase my journey, projects, and contributions to the tech community.
            </p>
            <p>
              Whether it's building intelligent systems, sharing knowledge through articles,
              or creating educational content, I'm committed to making a difference in the
              world of technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
