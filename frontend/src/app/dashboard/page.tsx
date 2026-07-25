'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Terminal, ShieldAlert, Cpu, Key, Play, RotateCw,
  Trash2, Plus, MessageSquare, BookOpen, Layers, CheckCircle, BarChart3, Clock, AlertTriangle
} from 'lucide-react'
import { useAuth } from '@/store/auth'
import apiClient from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface GeminiKey {
  id: number
  name: string
  key_value: string
  is_active: boolean
  used_count: number
  created_at: string
}

interface AgentLog {
  id: number
  tool_used: string
  prompt: string
  response_preview?: string
  status: string
  error_message?: string
  execution_time_ms: number
  created_at: string
}

interface Message {
  id: number
  name: string
  email: string
  subject: string
  content: string
  is_read: boolean
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, setUser, accessToken } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Password Enforcement Force State
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passError, setPassError] = useState('')
  const [passSuccess, setPassSuccess] = useState('')
  const [passChanging, setPassExecuting] = useState(false)

  // API Keys state
  const [keys, setKeys] = useState<GeminiKey[]>([])
  const [newKey, setNewKey] = useState({ name: 'Gemini Key', key_value: '' })
  const [keyError, setKeyError] = useState('')
  const [keySuccess, setKeySuccess] = useState('')

  // Messages state
  const [messages, setMessages] = useState<Message[]>([])

  // AI Agent Console state
  const [selectedTool, setSelectedTool] = useState('translate')
  const [agentPrompt, setAgentPrompt] = useState('')
  const [contextLang, setContextLang] = useState('Persian')
  const [agentExecuting, setAgentExecuting] = useState(false)
  const [agentResult, setAgentResult] = useState<any>(null)
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([])

  const toolsList = [
    { value: 'translate', label: '1. Multilingual Content Translator', placeholder: 'Enter the text you want to translate...' },
    { value: 'generate_article', label: '2. Professional Technical Article Writer', placeholder: 'Provide the topic, target audience, and main concepts...' },
    { value: 'analyze_sentiment', label: '3. Sentiment Classifier & Reply Drafter', placeholder: 'Paste the contact message content...' },
    { value: 'seo_optimizer', label: '4. Lighthouse 100/100 SEO & JSON-LD Generator', placeholder: 'Paste the page title, description, or article text...' },
    { value: 'categorize_content', label: '5. Automatic Content Categorizer & Tagger', placeholder: 'Enter your article or project draft text...' },
    { value: 'build_curriculum', label: '6. Course Curriculum & FAQ Designer', placeholder: 'Specify the subject you want to design a course for...' },
    { value: 'research_helper', label: '7. AI Lab & Research Paper Summarizer', placeholder: 'Paste the research abstract, patent notes, or code overview...' },
    { value: 'book_summarizer', label: '8. Book Cover & Preview Chapter Writer', placeholder: 'Describe the book core concept, theme, or proposal...' },
    { value: 'transcript_synthesizer', label: '9. Conference Notes & Seminar Synthesizer', placeholder: 'Paste raw bullet points or conference transcription...' },
    { value: 'dashboard_analytics', label: '10. Analytics Report & Roadmapping helper', placeholder: 'Provide metrics, views, or feedback lists (or leave blank)...' }
  ]

  useEffect(() => {
    // If no access token exists locally, redirect to login page
    if (!accessToken) {
      router.push('/login')
      return
    }

    async function checkAuthAndLoad() {
      try {
        // Fetch user me
        const meResponse = await apiClient.get('/auth/me')
        setUser(meResponse.data)

        if (meResponse.data.is_admin || meResponse.data.role === "Super Admin") {
          setIsAdmin(true)

          if (meResponse.data.needs_password_change) {
            setPasswordChangeOpen(true)
          }

          // Load administrative tables concurrently
          const [keysRes, logsRes, msgRes] = await Promise.all([
            apiClient.get('/agent/keys'),
            apiClient.get('/agent/logs'),
            apiClient.get('/messages')
          ])

          setKeys(keysRes.data)
          setAgentLogs(logsRes.data)
          setMessages(msgRes.data)
        } else {
          setIsAdmin(false)
        }
      } catch (err) {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoad()
  }, [accessToken, router, setUser])

  // Key operations
  const handleAddKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setKeyError('')
    setKeySuccess('')

    if (!newKey.key_value.trim()) {
      setKeyError('API Key value cannot be empty')
      return
    }

    try {
      const response = await apiClient.post('/agent/keys', newKey)
      setKeys(prev => [response.data, ...prev])
      setNewKey({ name: 'Gemini Key', key_value: '' })
      setKeySuccess('API key registered successfully')
    } catch (err: any) {
      setKeyError(err.response?.data?.detail || 'Failed to add key')
    }
  }

  const handleDeleteKey = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Gemini API Key?')) return
    try {
      await apiClient.delete(`/agent/keys/${id}`)
      setKeys(prev => prev.filter(k => k.id !== id))
    } catch (err) {
      alert('Failed to delete key')
    }
  }

  // Force Password change handler
  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPassError('')
    setPassSuccess('')

    if (newPassword.length < 8) {
      setPassError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setPassError('Passwords do not match')
      return
    }

    if (newPassword === 'mohammad9095') {
      setPassError('You must choose a different password than the default temporary one')
      return
    }

    try {
      setPassExecuting(true)
      const res = await apiClient.put('/auth/me', { password: newPassword })
      setUser(res.data)
      setPassSuccess('Password updated successfully! Force change completed.')
      setTimeout(() => {
        setPasswordChangeOpen(false)
      }, 1500)
    } catch (err: any) {
      setPassError(err.response?.data?.detail || 'Failed to update password')
    } finally {
      setPassExecuting(false)
    }
  }

  // Agent Operations
  const handleExecuteAgent = async () => {
    if (!agentPrompt.trim()) return

    try {
      setAgentExecuting(true)
      setAgentResult(null)

      const payload = {
        tool_used: selectedTool,
        prompt: agentPrompt,
        context_data: {
          target_language: contextLang,
          timestamp: new Date().toISOString()
        }
      }

      const response = await apiClient.post('/agent/execute', payload)
      setAgentResult(response.data)

      // Refresh execution logs
      const logsRes = await apiClient.get('/agent/logs')
      setAgentLogs(logsRes.data)
    } catch (err: any) {
      setAgentResult({
        status: 'Failed',
        result: err.response?.data?.detail || 'Execution failed. Ensure at least one Gemini API key is configured.',
        execution_time_ms: 0
      })
    } finally {
      setAgentExecuting(false)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await apiClient.patch(`/messages/${id}/mark-as-read`)
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
    } catch (err) {
      alert('Failed to update message')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030014] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500 border-r-2" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030014] px-4">
        <Card className="max-w-md w-full border-red-500/20 text-center p-8 bg-black/40 backdrop-blur-xl">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 text-sm mb-6">
            Only verified administrators of MYK Platform are permitted to access this panel.
          </p>
          <Button onClick={() => router.push('/login')} variant="primary" className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90">
            Log In as Administrator
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-10 relative">

      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* FORCE PASSWORD CHANGE MODAL OVERLAY */}
      {passwordChangeOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-indigo-500/30 bg-black/90 p-8 shadow-2xl relative">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
                <Key className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Change Temporary Password</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Mohammad Yasin, for absolute production security, you must update your temporary initial password before continuing.
              </p>
            </div>

            <form onSubmit={handleForcePasswordChange} className="space-y-4 mt-6">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Choose new secure password"
                className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm focus:outline-none"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm focus:outline-none"
                required
              />

              {passError && <p className="text-red-500 text-xs font-semibold text-center">{passError}</p>}
              {passSuccess && <p className="text-green-500 text-xs font-semibold text-center">{passSuccess}</p>}

              <Button type="submit" disabled={passChanging} className="w-full bg-indigo-600 hover:bg-indigo-500 h-11 text-white font-bold">
                {passChanging ? 'Updating Password...' : 'Change Password & Proceed'}
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-200 via-white to-pink-200 bg-clip-text text-transparent">MYK Admin Dashboard</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Enterprise Management Panel & Intelligent Gemini AI Core Agent
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono text-indigo-300">Admin Session: Active</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT TWO COLUMNS: AI Agent Console & Logs */}
        <div className="lg:col-span-2 space-y-8">

          {/* AI AGENT CONSOLE */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <CardTitle className="text-lg">Dynamic Gemini AI Admin Agent</CardTitle>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2.5 py-1 rounded-md">
                10 Tools Ready
              </span>
            </CardHeader>
            <CardContent className="p-6 space-y-6">

              {/* Tool Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Select Capability</label>
                  <select
                    value={selectedTool}
                    onChange={(e) => {
                      setSelectedTool(e.target.value)
                      setAgentPrompt('')
                      setAgentResult(null)
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {toolsList.map(t => (
                      <option key={t.value} value={t.value} className="bg-[#030014] text-white">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Context parameter (Target Language, etc.)</label>
                  <input
                    type="text"
                    value={contextLang}
                    onChange={(e) => setContextLang(e.target.value)}
                    placeholder="e.g. Persian, Arabic, English, Spanish"
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-11 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Prompt box */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Prompt Payload / Instruction Input</label>
                <textarea
                  rows={5}
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  placeholder={toolsList.find(t => t.value === selectedTool)?.placeholder || 'Enter your payload here...'}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-500"
                />
              </div>

              {/* Action Button */}
              <Button
                onClick={handleExecuteAgent}
                disabled={agentExecuting || !agentPrompt.trim()}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:opacity-90 border-0 h-11 text-white flex items-center justify-center gap-2 font-bold"
              >
                {agentExecuting ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Gemini is Orchestrating, Rotating Keys & Generating...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Execute AI Agent Tool</span>
                  </>
                )}
              </Button>

              {/* Execution Result Window */}
              {agentResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-white/10 bg-white/5 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-gray-400 font-mono">Status: <span className={agentResult.status === 'Success' ? 'text-green-400' : 'text-red-400 font-bold'}>{agentResult.status}</span></span>
                    {agentResult.execution_time_ms > 0 && (
                      <span className="text-gray-400 font-mono">Duration: {agentResult.execution_time_ms}ms</span>
                    )}
                  </div>
                  <div className="text-sm font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto text-gray-200">
                    {agentResult.result}
                  </div>
                </motion.div>
              )}

            </CardContent>
          </Card>

          {/* AGENT LOGS */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <CardTitle className="text-lg font-bold">Execution & Audit Logs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {agentLogs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No agent executions logged yet.</p>
                ) : (
                  agentLogs.map((log) => (
                    <div key={log.id} className="border border-white/5 bg-white/[0.02] p-3 rounded-lg text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400">{log.tool_used}</span>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <span>{log.execution_time_ms}ms</span>
                          <span className={log.status === 'Success' ? 'text-green-400' : 'text-red-400'}>{log.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 italic">Prompt: &quot;{log.prompt}&quot;</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN: ROTATING KEY MANAGER & MESSAGES */}
        <div className="space-y-8">

          {/* KEY MANAGER */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-pink-400" />
                <CardTitle className="text-lg">Rotating API Keys</CardTitle>
              </div>
              <span className="text-xs bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-full">
                {keys.length}/10 keys
              </span>
            </CardHeader>
            <CardContent className="p-6 space-y-6">

              {/* Add Key Form */}
              <form onSubmit={handleAddKey} className="space-y-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={newKey.name}
                    onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                    placeholder="Key Label (e.g., Primary Key)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="password"
                    value={newKey.key_value}
                    onChange={(e) => setNewKey({ ...newKey, key_value: e.target.value })}
                    placeholder="Paste Gemini API Key value..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-xs text-white font-mono focus:outline-none"
                    required
                  />
                </div>

                {keyError && <p className="text-red-500 text-xs font-medium">{keyError}</p>}
                {keySuccess && <p className="text-green-500 text-xs font-medium">{keySuccess}</p>}

                <Button type="submit" variant="glass" className="w-full text-xs h-9 flex items-center justify-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Gemini Key</span>
                </Button>
              </form>

              {/* List of Keys */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Key Pool</h4>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {keys.length === 0 ? (
                    <div className="flex items-center space-x-1.5 p-3 bg-yellow-500/5 border border-yellow-500/15 rounded-lg text-yellow-500 text-[11px]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>No dynamic keys added. Fallback env keys will be used.</span>
                    </div>
                  ) : (
                    keys.map((key) => (
                      <div key={key.id} className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2.5 rounded-lg text-xs">
                        <div>
                          <p className="font-bold text-white">{key.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">Key: AIzaSy...{key.key_value.slice(-4)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">Used: {key.used_count}</span>
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* LATEST MESSAGES */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <CardTitle className="text-lg">Contact Inquiries</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-72 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-xs text-center py-4">No contact messages received yet.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="border border-white/5 bg-white/[0.01] p-3 rounded-lg text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{msg.name}</p>
                          <p className="text-gray-400 text-[10px]">{msg.email}</p>
                        </div>
                        {!msg.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(msg.id)}
                            className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded hover:bg-emerald-500/20 transition-all"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-indigo-300">{msg.subject}</p>
                        <p className="text-gray-300 mt-1 leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  )
}
