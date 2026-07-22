# 🚀 MYK Platform

**Mohammad Yasin Karami's Personal Platform**

A production-grade, enterprise-level digital home featuring AI services, courses, books, conferences, and APIs.

## 🌍 Multilingual Support

Supports **60+ languages** including:
- English, Persian (فارسی), Arabic (العربية)
- Spanish (Español), French (Français), German (Deutsch)
- Chinese (中文), Japanese (日本語), Korean (한국어)
- Russian (Русский), Hindi (हिन्दी), Portuguese (Português)
- Turkish (Türkçe), Polish (Polski), Italian (Italiano)
- Dutch (Nederlands), Swedish (Svenska), Norwegian (Norsk)
- Danish (Dansk), Finnish (Suomi), Greek (Ελληνικά)
- Hebrew (עברית), Thai (ไทย), Vietnamese (Tiếng Việt)
- Indonesian (Bahasa Indonesia), Filipino (Tagalog)
- And 30+ more languages with RTL, complex scripts, and regional variants

## 🏗️ Architecture

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI with SQLAlchemy ORM
- **Database**: PostgreSQL with Alembic migrations
- **Authentication**: Auth.js with JWT
- **Storage**: Supabase Storage
- **Search**: Meilisearch with multilingual indexing
- **Caching**: Redis
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## 📦 Project Structure

```
myk-platform/
├── frontend/                 # Next.js application
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── styles/
├── backend/                  # FastAPI application
│   ├── app/
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   └── core/
├── database/                 # Database & migrations
│   └── migrations/
├── docs/                     # Documentation
├── .github/                  # GitHub workflows
└── docker-compose.yml        # Development environment
```

## ✨ Features

### Core Pages
- 🏠 **Home** - Hero with animated background, typing animations
- 👤 **About** - Biography, career story, skills, achievements
- 💼 **Projects** - Portfolio with galleries, timelines
- 📝 **Articles** - Professional blog with SEO, categories, tags
- 🎓 **Courses** - Course management with curriculum, reviews
- 🎤 **Conferences** - Events, seminars, workshops with media
- 📚 **Books** - Book catalog with previews
- 🔬 **Labs** - AI tools, research, prototypes
- 📈 **Journey** - Interactive professional timeline
- 📄 **Resume** - Professional resume
- 💬 **Contact** - Contact form with validation
- 📊 **Dashboard** - Admin CMS

### Advanced Features
- ✅ PWA with offline support, installable, service worker
- 🤖 AI-ready architecture (assistant, CMS, semantic search)
- 🔍 SEO optimized (Lighthouse 100 target)
- 🌙 Dark/Light mode
- ♿ WCAG 2.1 AA accessibility
- 🔐 Production-grade security (JWT, rate limiting, validation)
- 📱 Fully responsive design
- 🎨 Glassmorphism design inspired by Apple, Stripe, Vercel, Linear

## 🛠️ Tech Stack

### Frontend
```
- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Framer Motion
- shadcn/ui
- React Query
- Zustand (state management)
- i18next (internationalization)
```

### Backend
```
- FastAPI
- SQLAlchemy 2+
- Alembic
- Pydantic
- Python 3.11+
```

### Infrastructure
```
- PostgreSQL 15+
- Redis 7+
- Meilisearch 1+
- Supabase Storage
- Docker & Docker Compose
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose

### Development Setup

```bash
# Clone repository
git clone https://github.com/NEXA-ECO1/myk-platform.git
cd myk-platform

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup (new terminal)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Database setup (new terminal)
docker-compose up -d
```

## 📊 SEO & Performance

- Target Lighthouse score: **100**
- Metadata optimization
- OpenGraph & Twitter Cards
- Robots.txt & Sitemap.xml
- JSON-LD structured data
- RSS feeds
- Multilingual SEO support

## 🔐 Security

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- CSRF protection
- XSS protection
- SQL injection protection
- Role-based access control

## 🌐 Localization

Multilingual support through i18next with:
- RTL language support (Arabic, Persian, Hebrew)
- Complex script support (Chinese, Japanese, Thai, Devanagari)
- Regional variants
- Automatic language detection
- SEO-friendly language routing

## 📈 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s
- **Core Web Vitals**: Optimized

## 🤖 AI-Ready Architecture

Prepared for future integration:
- AI Assistant (chatbot)
- AI-powered CMS
- Semantic search
- Digital twin capabilities
- Machine learning pipelines

## 📝 License

Proprietary. All rights reserved to Mohammad Yasin Karami.

## 👨‍💼 Author

**Mohammad Yasin Karami**
- AI Engineer
- Python Developer
- Entrepreneur
- Building Tomorrow with Artificial Intelligence

---

**Status**: 🚀 In Active Development
