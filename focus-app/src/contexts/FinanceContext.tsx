"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  type: "income" | "expense"
  date: string
  description?: string
}

interface IncomeSource {
  id: string
  name: string
  monthlyAmount: number
  annualAmount: number
  type: "fixed" | "variable" | "passive"
  description?: string
}

interface ExpenseCategory {
  id: string
  name: string
  monthlyBudget: number
  spent: number
  description?: string
}

interface Asset {
  id: string
  name: string
  value: number
  type: "cash" | "investment" | "property" | "other"
  description?: string
}

interface Liability {
  id: string
  name: string
  amount: number
  type: "credit_card" | "loan" | "mortgage" | "other"
  description?: string
}

interface FinanceContextType {
  // Data
  transactions: Transaction[]
  incomeSources: IncomeSource[]
  expenseCategories: ExpenseCategory[]
  assets: Asset[]
  liabilities: Liability[]
  
  // Computed values
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  totalBudget: number
  budgetRemaining: number
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  addIncomeSource: (source: Omit<IncomeSource, "id">) => void
  addExpenseCategory: (category: Omit<ExpenseCategory, "id">) => void
  addAsset: (asset: Omit<Asset, "id">) => void
  addLiability: (liability: Omit<Liability, "id">) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary Payment",
    amount: 5200,
    category: "Salary",
    type: "income",
    date: "2024-12-01",
    description: "Monthly salary"
  },
  {
    id: "2",
    title: "Monthly Rent",
    amount: -1200,
    category: "Housing",
    type: "expense",
    date: "2024-12-01",
    description: "Apartment rent"
  },
  {
    id: "3",
    title: "Whole Foods",
    amount: -85.50,
    category: "Food",
    type: "expense",
    date: "2024-11-30",
    description: "Groceries"
  },
  {
    id: "4",
    title: "Shell Gas Station",
    amount: -45.20,
    category: "Transportation",
    type: "expense",
    date: "2024-11-29",
    description: "Fuel"
  }
]

const mockIncomeSources: IncomeSource[] = [
  {
    id: "1",
    name: "Primary Job",
    monthlyAmount: 5200,
    annualAmount: 62400,
    type: "fixed",
    description: "Full-time salary"
  },
  {
    id: "2",
    name: "Freelance Work",
    monthlyAmount: 800,
    annualAmount: 9600,
    type: "variable",
    description: "Side projects"
  },
  {
    id: "3",
    name: "Investment Income",
    monthlyAmount: 150,
    annualAmount: 1800,
    type: "passive",
    description: "Dividends & interest"
  }
]

const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: "1",
    name: "Housing",
    monthlyBudget: 1300,
    spent: 1200,
    description: "Monthly fixed costs"
  },
  {
    id: "2",
    name: "Food & Dining",
    monthlyBudget: 600,
    spent: 480,
    description: "Groceries and restaurants"
  },
  {
    id: "3",
    name: "Transportation",
    monthlyBudget: 400,
    spent: 320,
    description: "Car, gas, public transit"
  }
]

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Checking Account",
    value: 3450,
    type: "cash",
    description: "Chase Bank"
  },
  {
    id: "2",
    name: "Savings Account",
    value: 15000,
    type: "cash",
    description: "High-yield savings"
  },
  {
    id: "3",
    name: "Investment Portfolio",
    value: 25000,
    type: "investment",
    description: "Stocks & bonds"
  },
  {
    id: "4",
    name: "401(k)",
    value: 45000,
    type: "investment",
    description: "Retirement account"
  }
]

const mockLiabilities: Liability[] = [
  {
    id: "1",
    name: "Credit Card",
    amount: 2300,
    type: "credit_card",
    description: "Chase Freedom"
  },
  {
    id: "2",
    name: "Student Loan",
    amount: 28500,
    type: "loan",
    description: "Federal loan"
  },
  {
    id: "3",
    name: "Car Loan",
    amount: 12000,
    type: "loan",
    description: "Auto financing"
  }
]

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [incomeSources] = useState<IncomeSource[]>(mockIncomeSources)
  const [expenseCategories] = useState<ExpenseCategory[]>(mockExpenseCategories)
  const [assets] = useState<Asset[]>(mockAssets)
  const [liabilities] = useState<Liability[]>(mockLiabilities)

  // Computed values
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0)
  const netWorth = totalAssets - totalLiabilities
  const monthlyIncome = incomeSources.reduce((sum, source) => sum + source.monthlyAmount, 0)
  const monthlyExpenses = expenseCategories.reduce((sum, category) => sum + category.spent, 0)
  const totalBalance = assets.filter(a => a.type === 'cash').reduce((sum, asset) => sum + asset.value, 0)
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0
  const totalBudget = expenseCategories.reduce((sum, category) => sum + category.monthlyBudget, 0)
  const budgetRemaining = totalBudget - monthlyExpenses

  // Action functions (mock implementations)
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    console.log("Adding transaction:", transaction)
  }

  const addIncomeSource = (source: Omit<IncomeSource, "id">) => {
    console.log("Adding income source:", source)
  }

  const addExpenseCategory = (category: Omit<ExpenseCategory, "id">) => {
    console.log("Adding expense category:", category)
  }

  const addAsset = (asset: Omit<Asset, "id">) => {
    console.log("Adding asset:", asset)
  }

  const addLiability = (liability: Omit<Liability, "id">) => {
    console.log("Adding liability:", liability)
  }

  const value: FinanceContextType = {
    transactions,
    incomeSources,
    expenseCategories,
    assets,
    liabilities,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    totalAssets,
    totalLiabilities,
    netWorth,
    totalBudget,
    budgetRemaining,
    addTransaction,
    addIncomeSource,
    addExpenseCategory,
    addAsset,
    addLiability,
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}