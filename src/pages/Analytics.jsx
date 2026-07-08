import { useMemo } from 'react'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import GlassCard from '../components/GlassCard.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useTransactions } from '../hooks/useTransactions.js'
import {
  getAverageDailySpend,
  getCurrentMonthKey,
  getExpenseCategoryBreakdown,
  getMonthlyTrend,
  getSavingsRate,
  getTopExpenseCategory,
} from '../utils/analytics.js'
import { formatCurrency } from '../utils/formatters.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

function getChartOptions(isDark, includeScales = true) {
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const gridColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.12)'

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#475569',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
      },
    },
  }

  if (includeScales) {
    options.scales = {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
        border: { display: false },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
        border: { display: false },
      },
    }
  }

  return options
}

export default function Analytics() {
  const { transactions } = useTransactions()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const monthKey = getCurrentMonthKey()
  const monthLabel = new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' })

  const categoryBreakdown = useMemo(
    () => getExpenseCategoryBreakdown(transactions, monthKey),
    [transactions, monthKey],
  )

  const monthlyTrend = useMemo(() => getMonthlyTrend(transactions), [transactions])

  const pieData = useMemo(
    () => ({
      labels: categoryBreakdown.map((item) => item.label),
      datasets: [
        {
          data: categoryBreakdown.map((item) => item.amount),
          backgroundColor: categoryBreakdown.map((item) => item.color),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    }),
    [categoryBreakdown],
  )

  const barData = useMemo(
    () => ({
      labels: monthlyTrend.labels,
      datasets: [
        {
          label: 'Income',
          data: monthlyTrend.incomeData,
          backgroundColor: 'rgba(34, 197, 94, 0.75)',
          borderRadius: 10,
          borderSkipped: false,
        },
        {
          label: 'Expenses',
          data: monthlyTrend.expenseData,
          backgroundColor: 'rgba(244, 63, 94, 0.75)',
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    }),
    [monthlyTrend],
  )

  const avgDailySpend = getAverageDailySpend(transactions, monthKey)
  const topCategory = getTopExpenseCategory(transactions, monthKey)
  const savingsRate = getSavingsRate(transactions, monthKey)

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Spending by Category
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{monthLabel} breakdown</p>
          <div className="mt-6 flex h-80 items-center justify-center">
            {categoryBreakdown.length > 0 ? (
              <Doughnut
                data={pieData}
                options={{
                  ...getChartOptions(isDark, false),
                  cutout: '65%',
                }}
              />
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No expense data for this month yet.
              </p>
            )}
          </div>
        </GlassCard>

        <GlassCard delay={0.05}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Monthly Overview
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Income vs expenses trend
          </p>
          <div className="mt-6 h-80">
            <Bar data={barData} options={getChartOptions(isDark)} />
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {[
          { label: 'Avg. Daily Spend', value: formatCurrency(avgDailySpend) },
          { label: 'Top Category', value: topCategory },
          { label: 'Savings Rate', value: `${savingsRate.toFixed(0)}%` },
        ].map((stat, index) => (
          <GlassCard key={stat.label} hover delay={0.1 + index * 0.05}>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
