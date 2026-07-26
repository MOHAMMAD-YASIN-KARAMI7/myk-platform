# MYK Platform v1.0

Premium personal platform for Mohammad Yasin Karami.

## Overview

MYK Platform is a modern, premium personal website built with cutting-edge technologies. It serves as the digital home for Mohammad Yasin Karami and is designed to be expanded with future features like projects, articles, courses, and more.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Internationalization**: next-intl (English & Persian)
- **Design**: Glassmorphism, Premium animations, Responsive

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── features/           # Feature-based modules
├── lib/                # Utility functions
├── database/           # Database client
├── locales/            # Translation files
├── styles/             # Global styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
clone the repository
cd myk-platform

install dependencies
npm install

setup environment
cp .env.local.example .env.local

setup database
npm run db:push

start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema changes
- `npm run db:migrate` - Create database migration
- `npm run db:studio` - Open Prisma Studio

## Milestones

### Milestone 1: Project Setup ✅
- Project structure
- Configuration files
- Design system
- Database setup

### Milestone 2: Pages Implementation
- Home page with hero section
- About page
- Contact page

### Milestone 3: Database & Contact System
- Contact form validation
- Message storage
- Contact management

### Milestone 4: SEO & PWA
- SEO optimization
- PWA support
- Performance optimization

## Features

- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Database integration (SQLite + Prisma)
- ⏳ Internationalization (EN/FA)
- ⏳ Premium animations
- ⏳ Contact form
- ⏳ SEO optimization
- ⏳ PWA support

## Deployment

The project is ready to be deployed on Vercel:

```bash
npm run build
npm start
```

## License

Private - Mohammad Yasin Karami

## Contact

Mohammad Yasin Karami - [Website](https://myk-platform.com)
