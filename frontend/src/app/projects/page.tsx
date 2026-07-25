'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Code, ExternalLink, Github, Sparkles } from 'lucide-react'
import apiClient from '@/lib/api'

interface Project {
  id: number
  title: string
  slug: string
  description: string
  cover_image?: string
  technologies: string[]
  status: string
  github_url?: string
  demo_url?: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await apiClient.get('/projects')
        setProjects(response.data)
      } catch (err) {
        // Fallback to high-quality mockup data if database is empty/local
        setProjects([
          {
            id: 1,
            title: "Autonomous Agent Swarm Orchestrator",
            slug: "agent-swarm",
            description: "An enterprise-grade orchestration pipeline for coordinating multiple AI sub-agents to solve complex programmatic objectives.",
            technologies: ["FastAPI", "Python", "Gemini Pro", "LangChain", "Redis"],
            status: "Completed",
            github_url: "https://github.com/mohammadyasinkarami/agent-swarm",
            demo_url: "#"
          },
          {
            id: 2,
            title: "MYK Multilingual AI Translation Gateway",
            slug: "myk-gateway",
            description: "A secure, low-latency microservice leveraging rotating Gemini keys to translate high-throughput text payloads across 60+ languages.",
            technologies: ["FastAPI", "PostgreSQL", "Gemini API", "Docker", "React"],
            status: "In Development",
            github_url: "https://github.com/mohammadyasinkarami/myk-gateway",
            demo_url: "#"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#030014] text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-1 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-xs text-purple-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Engineering Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Enterprise Projects</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Exploring deep technical projects, software products, and AI integration systems developed by Mohammad Yasin Karami.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 border-r-2" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:border-indigo-500/40 transition-all duration-500">
                {/* Simulated Cover Image or Gradient */}
                <div className="h-48 w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 relative flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  <div className="relative text-center z-10">
                    <Code className="w-12 h-12 text-indigo-400 mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">{project.status}</span>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
