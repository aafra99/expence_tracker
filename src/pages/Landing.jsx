import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiBarChart2,
  FiDownload,
  FiMoon,
  FiShield,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import PageBackground from '../components/PageBackground.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { APP_NAME } from '../utils/constants.js'

const FEATURES = [
  {
    icon: FiTrendingUp,
    title: 'Smart Dashboard',
    description: 'Track balance, income, and expenses with real-time updates and budget insights.',
  },
  {
    icon: FiBarChart2,
    title: 'Visual Analytics',
    description: 'Beautiful pie and bar charts that update automatically as you add transactions.',
  },
  {
    icon: FiDownload,
    title: 'Export Reports',
    description: 'Download your financial data as CSV for presentations, records, or analysis.',
  },
  {
    icon: FiMoon,
    title: 'Dark Mode',
    description: 'Switch themes instantly with preferences saved locally in your browser.',
  },
  {
    icon: FiShield,
    title: 'Private & Secure',
    description: 'All data stays on your device. No accounts, no servers, no tracking.',
  },
  {
    icon: FiZap,
    title: 'Lightning Fast',
    description: 'Built with React and Vite for a smooth, responsive experience on any device.',
  },
]

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PageBackground />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg shadow-lg shadow-indigo-500/30">
            💰
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/dashboard" className="btn-primary hidden sm:inline-flex">
            Open App
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300">
              <FiZap className="h-4 w-4" />
              College Project · Production Ready
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Take control of your{' '}
              <span className="text-gradient">finances</span> with confidence
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {APP_NAME} helps you track income, manage expenses, visualize spending patterns,
              and stay within budget — all in a beautiful, modern interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard" className="btn-primary px-8 py-3.5 text-base">
                Get Started Free
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <a href="#features" className="btn-secondary px-8 py-3.5 text-base">
                Explore Features
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                <p>Free to use</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Local</p>
                <p>Data storage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Real-time</p>
                <p>Analytics</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float glass-strong rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Balance</p>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +12.5%
                </span>
              </div>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">$3,467.86</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-4">
                  <p className="text-xs text-slate-500">Income</p>
                  <p className="mt-1 text-lg font-bold text-emerald-600">$3,650</p>
                </div>
                <div className="rounded-2xl bg-rose-500/10 p-4">
                  <p className="text-xs text-slate-500">Expenses</p>
                  <p className="mt-1 text-lg font-bold text-rose-600">$182</p>
                </div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[36%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
              </div>
              <p className="mt-2 text-xs text-slate-500">36% of monthly budget used</p>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-500">Top Category</p>
              <p className="font-semibold text-slate-900 dark:text-white">Food · $85.50</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to manage money
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            A complete expense tracking solution built for students, professionals, and anyone
            who wants clarity over their spending.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="glass group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-600 transition-transform group-hover:scale-110 dark:text-violet-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="glass-strong rounded-3xl p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Ready to impress your faculty?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-300">
            Launch the app, add a few transactions, explore analytics, and export your data —
            all in under a minute.
          </p>
          <Link to="/dashboard" className="btn-primary mt-8 px-10 py-3.5 text-base">
            Launch Dashboard
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© 2026 {APP_NAME}. Built for college presentation.</p>
        <p className="mt-1">React · Vite · Tailwind CSS · Chart.js</p>
      </footer>
    </div>
  )
}
