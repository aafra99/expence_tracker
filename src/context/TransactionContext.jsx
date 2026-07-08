import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockTransactions.js'
import {
  getBudgetUsagePercent,
  getMonthlyExpenseTotal,
  getTotals,
} from '../utils/analytics.js'
import { STORAGE_KEYS } from '../utils/constants.js'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'

const DEFAULT_BUDGET = 500

const TransactionContext = createContext(null)

function loadInitialTransactions() {
  const saved = loadFromStorage(STORAGE_KEYS.transactions, null)
  return saved ?? MOCK_TRANSACTIONS
}

function loadInitialBudget() {
  return loadFromStorage(STORAGE_KEYS.budget, DEFAULT_BUDGET)
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(loadInitialTransactions)
  const [budgetGoal, setBudgetGoalState] = useState(loadInitialBudget)

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.transactions, transactions)
  }, [transactions])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.budget, budgetGoal)
  }, [budgetGoal])

  const totals = useMemo(() => getTotals(transactions), [transactions])
  const monthlyExpenses = useMemo(() => getMonthlyExpenseTotal(transactions), [transactions])
  const budgetUsedPercent = useMemo(
    () => getBudgetUsagePercent(monthlyExpenses, budgetGoal),
    [monthlyExpenses, budgetGoal],
  )

  function addTransaction(transaction) {
    setTransactions((current) => [
      {
        ...transaction,
        id: crypto.randomUUID(),
      },
      ...current,
    ])
  }

  function updateTransaction(id, updates) {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction,
      ),
    )
  }

  function deleteTransaction(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function setBudgetGoal(value) {
    const parsed = Number.parseFloat(value)
    if (!Number.isNaN(parsed) && parsed > 0) {
      setBudgetGoalState(parsed)
    }
  }

  function clearAllData() {
    setTransactions([])
    setBudgetGoalState(DEFAULT_BUDGET)
  }

  function resetDemoData() {
    setTransactions(MOCK_TRANSACTIONS)
    setBudgetGoalState(DEFAULT_BUDGET)
  }

  const value = {
    transactions,
    budgetGoal,
    monthlyExpenses,
    budgetUsedPercent,
    totals,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBudgetGoal,
    clearAllData,
    resetDemoData,
  }

  return (
    <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
  )
}

export function useTransactionContext() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactionContext must be used within TransactionProvider')
  }
  return context
}
