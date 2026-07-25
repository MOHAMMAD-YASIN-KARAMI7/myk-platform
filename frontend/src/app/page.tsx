'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Code, Cpu, Award, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/store/i18n'

export default function HomePage() {
  const { t, language } = useI18n()
  const [typedText, setTypedText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Multilingual typing roles list
  const rolesByLang: { [key: string]: string[] } = {
    en: [
      "Mohammad Yasin Karami",
      "AI Engineer",
      "Python Developer",
      "Entrepreneur",
      "Building Tomorrow with AI"
    ],
    fa: [
      "محمد یاسین کرمی",
      "مهندس هوش مصنوعی",
      "برنامه‌نویس پایتون",
      "کارآفرین",
      "ساختن فردا با هوش مصنوعی"
    ],
    ar: [
      "محمد ياسين كرامي",
      "مهندس الذكاء الاصطناعي",
      "مطور بايثون",
      "رائد أعمال",
      "بناء الغد مع الذكاء الاصطناعي"
    ]
  }

  const activeRoles = rolesByLang[language] || rolesByLang['en']

  useEffect(() => {
    const activeRole = activeRoles[roleIndex]
    if (!activeRole) return
    let timer: NodeJS.Timeout

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, 50)
    } else {
      timer = setTimeout(() => {
        setTypedText(activeRole.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, 100)
    }

    // Handle role transitions
    if (!isDeleting && charIndex === activeRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex(prev => (prev + 1) % activeRoles.length)
    }

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex, language, activeRoles])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]">
      {/* Premium background gradient meshes */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-pink-500/5 to-purple-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32 text-center flex flex-col items-center">
        {/* Animated MK Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-24 h-24 mb-8 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-[12px] group-hover:blur-[20px] opacity-70 group-hover:opacity-100 transition-all duration-500" />
          <div className="relative w-full h-full bg-black/90 rounded-2xl border border-white/20 flex items-center justify-center">
            <span className="text-white font-black text-3xl tracking-widest bg-gradient-to-r from-indigo-200 via-white to-pink-200 bg-clip-text text-transparent">MK</span>
          </div>
        </motion.div>

        {/* Name and Typing Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          {t('hero_title')}
        </motion.h1>

        <div className="h-10 sm:h-12 flex items-center justify-center mb-8">
          <p className="text-lg sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {typedText}
            <span className="animate-pulse ml-0.5 text-white">|</span>
          </p>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mb-12 leading-relaxed"
        >
          {t('hero_subtitle')}. {language === 'en' ? 'Building tomorrow with state-of-the-art Artificial Intelligence, deep technical systems, and premium design language.' : language === 'fa' ? 'ساختن فردا با سیستم‌های پیشرفته هوش مصنوعی، کدهای تمیز و زبان طراحی سطح بالا.' : 'بناء الغد باستخدام الذكاء الاصطناعي المتطور، والأكواد النظيفة، ولغة التصميم الراقية.'}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/projects">
            <Button variant="primary" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 border-0 text-white flex items-center gap-2 px-8 py-4 shadow-lg shadow-indigo-500/25">
              {t('view_projects')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/about">
            <Button variant="glass" size="lg" className="w-full sm:w-auto flex items-center gap-2 px-8 py-4">
              <MessageSquare className="w-4 h-4" />
              {t('nav_about')}
            </Button>
          </Link>
        </motion.div>

        {/* Core Pillars / Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-24"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">AI Systems</h3>
            <p className="text-gray-400 text-sm">Deep Learning & Gemini AI models</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
              <Code className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Architecture</h3>
            <p className="text-gray-400 text-sm">SOLID, clean, scalable code bases</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4 border border-pink-500/20">
              <Award className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Premium Quality</h3>
            <p className="text-gray-400 text-sm">Stripe-style animations and responsive UI</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
