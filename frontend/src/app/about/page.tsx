'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Award, Target, Briefcase, GraduationCap } from 'lucide-react'

export default function AboutPage() {
  const skills = [
    { category: "Artificial Intelligence", items: ["Deep Learning", "NLP", "Large Language Models", "Gemini API", "OpenAI API", "LangChain"] },
    { category: "Backend Engineering", items: ["Python", "FastAPI", "Django", "SQLAlchemy", "PostgreSQL", "Redis"] },
    { category: "Frontend Engineering", items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"] },
    { category: "DevOps & Infrastructure", items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Railway", "Vercel"] }
  ]

  return (
    <div className="relative min-h-screen bg-[#030014] text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glowing effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs text-indigo-400 font-medium"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Meet Mohammad Yasin Karami</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            Senior AI Architect & Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Pioneering modern intelligent systems, crafting enterprise backend architectures, and engineering gorgeous user interfaces.
          </motion.p>
        </div>

        {/* Biography Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Biography & Career Journey</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                Hello, I am Mohammad Yasin Karami. I am an AI Engineer, Python Developer, and tech entrepreneur. My passion lies in constructing high-performance systems that leverage deep learning and advanced LLM frameworks to solve real-world industry challenges.
              </p>
              <p>
                Throughout my professional journey, I have prioritized writing clean, scalable, and modular software based on SOLID and clean architecture principles. Evolving my platform, MYK, represents my commitment to establishing a premium, durable ecosystem where my works, research labs, books, and courses live.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                <Target className="w-5 h-5 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white text-sm">Vision</h4>
                  <p className="text-gray-400 text-xs mt-1">To bridge complex AI neural research with accessible, beautifully animated, premium products.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                <Briefcase className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white text-sm">Execution</h4>
                  <p className="text-gray-400 text-xs mt-1">Developing production-grade code using FastAPI, PostgreSQL, and Next.js, optimized for security.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <Card className="p-6 h-fit bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Core Focus</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Current Role:</span>
                <span className="text-white font-medium text-right">Founder & Lead Architect</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Experience:</span>
                <span className="text-white font-medium text-right">Senior AI & Backend</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Location:</span>
                <span className="text-white font-medium text-right">Tehran, Iran</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-gray-400">Languages:</span>
                <span className="text-indigo-400 font-medium text-right">English, Persian, Arabic</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Professional Skills Matrix</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300">
                <h3 className="font-bold text-white mb-4 text-base border-b border-white/5 pb-2">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="bg-white/5 border border-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
