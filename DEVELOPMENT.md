# MYK Platform v1.0 - Development Guide

## Token Usage Warning ⚠️

Monitoring token consumption during development. Notified when usage exceeds safe thresholds.

## Current Status

### Completed ✅

#### Milestone 1: Project Setup
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup with dark mode
- ✅ Design system and components
- ✅ Database schema (Prisma + SQLite)
- ✅ Global styles and themes
- ✅ Translation files (EN/FA)

#### Milestone 2: Pages Implementation
- ✅ Home page with premium hero section
- ✅ About page with biography and journey
- ✅ Contact page with form
- ✅ Navbar component with mobile menu
- ✅ Footer component
- ✅ Smooth animations (Framer Motion)
- ✅ Glassmorphism design
- ✅ Responsive layouts

#### Milestone 3: Database & Contact System
- ✅ Contact form validation (Zod + React Hook Form)
- ✅ API endpoint for form submission
- ✅ Database integration with Prisma
- ✅ Error handling and success messages

### Pending ⏳

- SEO optimization (Postponed as requested)
- PWA support (Postponed as requested)
- Internationalization (i18n routing)
- Email notifications

## Project Structure

```
myk-platform/
├── src/
│   ├── app/
│   │   ├── (pages)/              # Page routes with shared layout
│   │   ├── api/                  # API routes
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── theme-provider.tsx    # Dark mode provider
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── navbar.tsx            # Navigation component
│   │   └── footer.tsx            # Footer component
│   ├── features/
│   │   ├── home/
│   │   │   ├── pages/home.tsx
│   │   │   └── components/       # Hero, Skills, Vision, etc.
│   │   ├── about/
│   │   │   └── pages/about.tsx
│   │   └── contact/
│   │       ├── pages/contact.tsx
│   │       └── components/contact-form.tsx
│   ├── database/
│   │   └── client.ts             # Prisma client
│   ├── lib/
│   │   └── cn.ts                 # Utility functions
│   ├── locales/
│   │   ├── en.json               # English translations
│   │   └── fa.json               # Persian translations
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       └── metadata.ts           # SEO utilities
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── dev.db                    # SQLite database
└── public/                       # Static assets
```

## Running the Project

### Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local

# Initialize database
npm run db:push
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Available Commands

```bash
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run db:push    # Sync database schema
npm run db:studio  # Open Prisma Studio (database viewer)
```

## Features Implemented

### Pages
1. **Home** - Premium hero with animations, skills showcase, vision section
2. **About** - Biography, learning journey, interests, future vision
3. **Contact** - Contact form with validation and database storage

### Design
- Premium glassmorphism effects
- Smooth animations with Framer Motion
- Dark/Light mode support
- Fully responsive design
- Accessible components

### Technical
- TypeScript strict mode
- Form validation (Zod + React Hook Form)
- Database integration (Prisma + SQLite)
- API routes (Next.js Server Functions)
- Environment configuration
- Error handling

## Database Schema

```prisma
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Next Steps

1. Test all pages in browser
2. Verify form submission to database
3. Test mobile responsiveness
4. Deploy to Vercel
5. Add SEO metadata (when needed)
6. Add PWA support (when needed)

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

```bash
npm run build
```

## Design System

### Colors
- **Primary**: Dark (text) / Light backgrounds
- **Secondary**: Secondary actions
- **Accent**: Purple (280deg, 85%, 56%)
- **Destructive**: Red
- **Muted**: Gray for secondary text

### Typography
- **Font**: Geist (sans-serif), Geist Mono (code)
- **Headings**: Heading 1, 2, 3 classes
- **Base**: 16px root size

### Components
- **Buttons**: `.button-primary`, `.button-secondary`
- **Cards**: `.glass-effect`, `.glass-effect-dark`
- **Text**: `.heading-1`, `.text-muted`

## Monitoring

Token usage being monitored. Will be notified if consumption gets high.
