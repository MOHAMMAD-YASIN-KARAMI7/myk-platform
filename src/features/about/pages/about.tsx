'use client';

import { motion } from 'framer-motion';

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

export function AboutPage() {
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
            <h1 className="heading-1 mb-4">About Me</h1>
            <p className="text-xl text-muted">
              Learn more about my journey, expertise, and vision
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Biography */}
      <motion.section variants={itemVariants} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 mb-6">Biography</h2>
            <div className="glass-effect p-8 md:p-12 space-y-4">
              <p className="text-lg text-muted leading-relaxed">
                I'm Mohammad Yasin Karami, an AI engineer and full-stack developer with a
                passion for building intelligent systems and innovative web applications. With
                several years of hands-on experience in software development and artificial
                intelligence, I've had the opportunity to work on diverse projects that have
                shaped my expertise.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                My journey in technology began with a curiosity about how things work,
                which evolved into a deep commitment to mastering both theoretical concepts
                and practical applications of computer science. I believe in continuous
                learning and staying at the forefront of technological advancements.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Learning Journey */}
      <motion.section variants={itemVariants} className="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 mb-6">Learning Journey</h2>
            <div className="space-y-6">
              {[
                {
                  year: '2015-2019',
                  title: 'Foundation Phase',
                  description:
                    'Started with web development fundamentals, learning HTML, CSS, and JavaScript. Completed various online courses and built my first projects.',
                },
                {
                  year: '2019-2022',
                  title: 'Specialization Phase',
                  description:
                    'Focused on backend development with Python and Node.js. Explored data structures, algorithms, and system design. Got introduced to machine learning.',
                },
                {
                  year: '2022-Present',
                  title: 'Expertise Phase',
                  description:
                    'Deep dive into AI/ML, advanced backend architecture, and full-stack development. Worked on real-world projects and built a strong portfolio.',
                },
              ].map((phase, index) => (
                <motion.div
                  key={phase.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-effect p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-accent mb-1">{phase.year}</p>
                      <h3 className="heading-3 text-lg mb-2">{phase.title}</h3>
                      <p className="text-muted">{phase.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills & Interests */}
      <motion.section variants={itemVariants} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 mb-6">Current Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'AI & Machine Learning',
                  items: [
                    'Large Language Models',
                    'Deep Learning',
                    'Natural Language Processing',
                    'Computer Vision',
                  ],
                },
                {
                  title: 'Full-Stack Development',
                  items: ['Next.js', 'React', 'TypeScript', 'System Design'],
                },
                {
                  title: 'Open Source',
                  items: ['Contributing to projects', 'Building tools', 'Community engagement'],
                },
                {
                  title: 'Entrepreneurship',
                  items: ['Building products', 'Startups', 'Innovation', 'Business strategy'],
                },
              ].map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-effect p-6"
                >
                  <h3 className="heading-3 text-lg mb-4">{interest.title}</h3>
                  <ul className="space-y-2">
                    {interest.items.map((item) => (
                      <li key={item} className="text-muted text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section variants={itemVariants} className="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 mb-6">Future Vision</h2>
            <div className="glass-effect p-8 md:p-12 space-y-4">
              <p className="text-lg text-muted leading-relaxed">
                My vision for the future is to continue pushing the boundaries of what's
                possible with artificial intelligence and software development. I aim to
                create products and solutions that have a meaningful impact on society.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                I'm committed to sharing knowledge through articles, courses, and open-source
                projects. I believe in the power of community and collaboration to solve
                complex problems and create innovative solutions.
              </p>
              <p className="text-lg text-muted leading-relaxed">
                Ultimately, I want to be remembered as someone who contributed to the
                advancement of technology and inspired others to pursue their passions in
                software engineering and artificial intelligence.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
}
