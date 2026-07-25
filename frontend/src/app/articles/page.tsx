'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Award, BookOpen, Clock, Calendar } from 'lucide-react'
import apiClient from '@/lib/api'

interface Article {
  id: number
  title: string
  slug: string
  excerpt?: string
  category: string
  tags: string[]
  reading_time: number
  published_at?: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await apiClient.get('/articles')
        setArticles(response.data)
      } catch (err) {
        // Fallback mockup data
        setArticles([
          {
            id: 1,
            title: "Scaling Gemini API Key Usage with Multi-Key Rotation",
            slug: "rotating-gemini-keys",
            excerpt: "How to architecture high-throughput AI services by dynamically rotating up to 10 Gemini API keys to handle scale, limit rate-limits, and increase system availability.",
            category: "AI Engineering",
            tags: ["Gemini API", "FastAPI", "Python", "Architecture"],
            reading_time: 8,
            published_at: "2026-07-24T12:00:00.000Z"
          },
          {
            id: 2,
            title: "Implementing Pristine Glassmorphism in Tailwind CSS",
            slug: "glassmorphism-tailwind",
            excerpt: "Learn the secrets behind the design aesthetic of Apple, Stripe, and Linear. How to write clean backdrop filters, bordered gradients, and gorgeous color glows.",
            category: "UI/UX Design",
            tags: ["Tailwind CSS", "Next.js", "Design System"],
            reading_time: 5,
            published_at: "2026-07-23T10:00:00.000Z"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030014] text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs text-indigo-400 font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mohammad Yasin Karami's Technical Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Technical Publications</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            In-depth guides, articles, and scientific logs covering artificial intelligence engineering, design systems, and programming.
          </p>
        </div>

        {/* List of Articles */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 border-r-2" />
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Card key={article.id} className="p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <span className="text-xs uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-md px-2.5 py-1 text-indigo-400 font-bold w-fit">
                    {article.category}
                  </span>

                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.reading_time} min read</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer">{article.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{article.excerpt}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-6">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
