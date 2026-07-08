import { useState } from 'react'
import { FiCpu, FiRefreshCw, FiSend, FiUser } from 'react-icons/fi'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard.jsx'
import { useTransactions } from '../hooks/useTransactions.js'
import { generateFinancialInsights } from '../utils/gemini.js'

function formatLine(line) {
  return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

function InsightMessage({ content, role }) {
  const isAssistant = role === 'assistant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
          isAssistant
            ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
            : 'bg-white/15 text-slate-600 dark:text-slate-300'
        }`}
      >
        {isAssistant ? <FiCpu className="h-5 w-5" /> : <FiUser className="h-5 w-5" />}
      </div>

      <div
        className={`max-w-[85%] rounded-2xl px-5 py-4 ${
          isAssistant
            ? 'glass border border-white/20'
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
        }`}
      >
        {isAssistant ? (
          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {content.split('\n').map((line, index) => {
              if (!line.trim()) {
                return <div key={index} className="h-2" />
              }
              if (line.startsWith('## ')) {
                return (
                  <h3
                    key={index}
                    className="pt-2 text-base font-bold text-slate-900 dark:text-white"
                  >
                    {line.replace('## ', '')}
                  </h3>
                )
              }
              if (line.startsWith('# ')) {
                return (
                  <h2 key={index} className="text-lg font-bold text-slate-900 dark:text-white">
                    {line.replace('# ', '')}
                  </h2>
                )
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <p
                    key={index}
                    className="flex gap-2 pl-1"
                    dangerouslySetInnerHTML={{
                      __html: `• ${formatLine(line.slice(2))}`,
                    }}
                  />
                )
              }
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: formatLine(line) }}
                />
              )
            })}
          </div>
        ) : (
          <p className="text-sm font-medium">{content}</p>
        )}
      </div>
    </motion.div>
  )
}

export default function AIInsights() {
  const { transactions, budgetGoal } = useTransactions()
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I'm your AI Financial Advisor. I can analyze your transactions, identify spending patterns, and recommend budgets tailored to your habits.\n\nClick **Generate Insights** whenever you're ready for a full financial review.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate() {
    if (loading) {
      return
    }

    setError('')
    setLoading(true)

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: 'Analyze my finances and provide personalized insights.',
    }

    setMessages((current) => [...current, userMessage])

    try {
      const insights = await generateFinancialInsights(transactions, budgetGoal)

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: insights,
        },
      ])
    } catch (err) {
      setError(err.message ?? 'Failed to generate insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <GlassCard className="bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-blue-500/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-500/25">
              <FiCpu className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                AI Financial Advisor
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Powered by Google Gemini · {transactions.length} transactions analyzed
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || transactions.length === 0}
            className="btn-primary px-6 py-3.5"
          >
            {loading ? (
              <>
                <FiRefreshCw className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FiSend className="h-4 w-4" />
                Generate Insights
              </>
            )}
          </button>
        </div>

        {transactions.length === 0 && (
          <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
            Add some transactions first so the AI has data to analyze.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600 dark:text-rose-300">
            {error}
          </p>
        )}
      </GlassCard>

      <GlassCard className="min-h-[420px]">
        <div className="space-y-6">
          {messages.map((message) => (
            <InsightMessage key={message.id} role={message.role} content={message.content} />
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                <FiCpu className="h-5 w-5" />
              </div>
              <div className="glass rounded-2xl px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:300ms]" />
                  <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                    Analyzing your finances...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </GlassCard>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        AI insights are generated from your local transaction data. Get a free API key at{' '}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noreferrer"
          className="text-violet-500 hover:underline"
        >
          Google AI Studio
        </a>{' '}
        and add it to <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code>
      </p>
    </div>
  )
}
