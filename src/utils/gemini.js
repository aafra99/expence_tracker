import { GoogleGenerativeAI } from '@google/generative-ai'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories.js'
import {
  getCurrentMonthKey,
  getExpenseCategoryBreakdown,
  getMonthlyExpenseTotal,
  getTotals,
} from './analytics.js'

function getCategoryLabel(categoryId) {
  const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(
    (item) => item.id === categoryId,
  )
  return category?.label ?? categoryId
}

export function buildFinancialContext(transactions, budgetGoal) {
  const monthKey = getCurrentMonthKey()
  const totals = getTotals(transactions)
  const monthlyExpenses = getMonthlyExpenseTotal(transactions, monthKey)
  const categoryBreakdown = getExpenseCategoryBreakdown(transactions, monthKey)

  const monthTransactions = transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return key === monthKey
  })

  return {
    month: monthKey,
    budgetGoal,
    monthlyExpenses,
    totalIncome: totals.income,
    totalExpenses: totals.expenses,
    balance: totals.balance,
    transactionCount: transactions.length,
    categoryBreakdown: categoryBreakdown.map((item) => ({
      category: item.label,
      amount: item.amount,
    })),
    recentTransactions: monthTransactions.slice(0, 20).map((transaction) => ({
      type: transaction.type,
      title: transaction.title,
      category: getCategoryLabel(transaction.category),
      amount: transaction.amount,
      date: transaction.date,
    })),
  }
}

export async function generateFinancialInsights(transactions, budgetGoal) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    return `
  ## AI Insights Disabled
  
  AI Insights are disabled in this demo.
  
  The Expense Tracker continues to work normally.
  
  To enable AI-powered financial analysis, add a valid Gemini API key to the project's .env.local file.
  `
  }

  const context = buildFinancialContext(transactions, budgetGoal)
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are a friendly, professional AI Financial Advisor helping a college student manage their personal finances.

Analyze the following financial data and provide clear, actionable insights. Use markdown formatting with ## headers for each section.

Your response MUST include these sections in order:

## Top Spending Category
Identify the category where the user spends the most this month and explain why it matters.

## Money-Saving Suggestions
Provide 3-4 specific, practical tips based on their actual spending patterns.

## Unusual Spending Detection
Flag any transactions or patterns that seem unusual, unusually high, or worth reviewing. If nothing unusual, say so.

## Monthly Financial Summary
Give a concise overview of income, expenses, balance, and budget usage this month.

## Recommended Category Budgets
Suggest a realistic monthly budget amount for each expense category based on their data and income.

Keep the tone encouraging and professional. Use bullet points where helpful. Be specific with dollar amounts from the data.

Financial Data:
${JSON.stringify(context, null, 2)}`

  const result = await model.generateContent(prompt)
  const response = result.response.text()

  if (!response?.trim()) {
    throw new Error('No insights were returned. Please try again.')
  }

  return response
}
