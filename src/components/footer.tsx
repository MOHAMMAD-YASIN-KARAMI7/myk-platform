'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  {
    label: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Social',
    links: [
      { label: 'GitHub', href: 'https://github.com/MOHAMMAD-YASIN-KARAMI7' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 dark:bg-muted/10">
      <div className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-xl gradient-text block mb-2">
              MYK
            </Link>
            <p className="text-muted text-sm">
              Premium personal platform for Mohammad Yasin Karami
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.label}>
              <h3 className="font-semibold mb-4">{section.label}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted hover:text-foreground transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t py-6">
          <p className="text-center text-muted text-sm">
            © {new Date().getFullYear()} Mohammad Yasin Karami. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
