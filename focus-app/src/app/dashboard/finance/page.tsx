"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFinance } from "@/contexts/FinanceContext"
import { BudgetModal } from "@/components/finance/BudgetModal"
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Building,
  Plus,
  Edit,
  Trash2,
  Calculator
} from "lucide-react"

type Tab = "summary" | "transactions" | "budget" | "expense-sources" | "income-sources" | "assets-liabilities"

const tabs = [
  { id: "summary", label: "Summary", icon: PieChart },
  { id: "transactions", label: "Transactions", icon: DollarSign },
  { id: "budget", label: "Budget", icon: Calculator },
  { id: "expense-sources", label: "Expense Sources", icon: TrendingDown },
  { id: "income-sources", label: "Income Sources", icon: TrendingUp },
  { id: "assets-liabilities", label: "Assets & Liabilities", icon: Building },
] as const

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<Tab>("summary")

  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return <SummaryTab />
      case "transactions":
        return <TransactionsTab />
      case "budget":
        return <BudgetTab />
      case "expense-sources":
        return <ExpenseSourcesTab />
      case "income-sources":
        return <IncomeSourcesTab />
      case "assets-liabilities":
        return <AssetsLiabilitiesTab />
      default:
        return <SummaryTab />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground mt-2">
          Track your income, expenses, and financial health
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  )
}

function SummaryTab() {
  const { totalBalance, monthlyIncome, monthlyExpenses, savingsRate, transactions } = useFinance()
  
  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${monthlyExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-4.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Housing</span>
                <span className="text-sm font-medium">$1,200 (37.7%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "37.7%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Food</span>
                <span className="text-sm font-medium">$480 (15.1%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "15.1%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Transportation</span>
                <span className="text-sm font-medium">$320 (10.1%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "10.1%" }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Entertainment</span>
                <span className="text-sm font-medium">$180 (5.7%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "5.7%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 4).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TransactionsTab() {
  const { transactions } = useFinance()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 
                      ? 'bg-green-100 dark:bg-green-900' 
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {transaction.amount > 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.type} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BudgetTab() {
  const { expenseCategories, monthlyIncome, monthlyExpenses, totalBudget, budgetRemaining } = useFinance()
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
  
  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${monthlyExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((monthlyExpenses / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${budgetRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(budgetRemaining).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {budgetRemaining >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBudget > 0 ? ((budgetRemaining / totalBudget) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Available budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Budget vs Actual</CardTitle>
            <Button onClick={() => setIsBudgetModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Edit Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {expenseCategories.map((category) => {
              const percentage = (category.spent / category.monthlyBudget) * 100
              const remaining = category.monthlyBudget - category.spent
              const isOverBudget = percentage > 100
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${category.spent.toLocaleString()} / ${category.monthlyBudget.toLocaleString()}
                      </p>
                      <p className={`text-sm ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.abs(remaining).toLocaleString()} {remaining >= 0 ? 'remaining' : 'over'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{percentage.toFixed(1)}% used</span>
                      <span className={isOverBudget ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                        {isOverBudget ? 'Over Budget!' : `${(100 - percentage).toFixed(1)}% available`}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          isOverBudget 
                            ? 'bg-red-500' 
                            : percentage > 80 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                      {isOverBudget && (
                        <div 
                          className="h-3 bg-red-600 rounded-full mt-[-12px] opacity-50"
                          style={{ width: `${Math.min(percentage - 100, 50)}%`, marginLeft: '100%' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Income</span>
                <span className="text-sm font-bold text-green-600">${monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Budgeted</span>
                <span className="text-sm font-bold">${totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Planned Savings</span>
                <span className="text-sm font-bold text-blue-600">
                  ${(monthlyIncome - totalBudget).toLocaleString()}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Savings Rate</span>
                  <span className="font-bold text-primary">
                    {monthlyIncome > 0 ? (((monthlyIncome - totalBudget) / monthlyIncome) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">50/30/20 Rule</p>
                <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                  50% needs, 30% wants, 20% savings
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Needs (50%):</span>
                  <span className="font-medium">${(monthlyIncome * 0.5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wants (30%):</span>
                  <span className="font-medium">${(monthlyIncome * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Savings (20%):</span>
                  <span className="font-medium">${(monthlyIncome * 0.2).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => setIsBudgetModalOpen(true)}>
                  Apply Recommended Budget
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BudgetModal 
        isOpen={isBudgetModalOpen} 
        onClose={() => setIsBudgetModalOpen(false)} 
      />
    </div>
  )
}

function ExpenseSourcesTab() {
  const { expenseCategories } = useFinance()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Expense Categories</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenseCategories.map((category) => {
          const remaining = category.monthlyBudget - category.spent
          const percentage = (category.spent / category.monthlyBudget) * 100
          
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Budget:</span>
                    <span className="text-sm font-medium">${category.monthlyBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Spent This Month:</span>
                    <span className="text-sm font-medium text-red-600">${category.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Remaining:</span>
                    <span className={`text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(remaining).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-4">
                    <div 
                      className={`h-2 rounded-full ${percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function IncomeSourcesTab() {
  const { incomeSources } = useFinance()
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Income Sources</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Income Source
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incomeSources.map((source) => (
          <Card key={source.id}>
            <CardHeader>
              <CardTitle className="text-lg">{source.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{source.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Amount:</span>
                  <span className="text-sm font-medium text-green-600">${source.monthlyAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Annual Total:</span>
                  <span className="text-sm font-medium">${source.annualAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Type:</span>
                  <span className="text-sm capitalize">{source.type}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AssetsLiabilitiesTab() {
  const { assets, liabilities, totalAssets, totalLiabilities, netWorth } = useFinance()
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assets Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-600">Assets</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {assets.map((asset) => (
                  <div key={asset.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">{asset.description}</p>
                      </div>
                      <span className="font-medium text-green-600">${asset.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-green-50 dark:bg-green-950">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Total Assets</h3>
                    <span className="font-bold text-green-600">${totalAssets.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liabilities Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600">Liabilities</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Liability
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {liabilities.map((liability) => (
                  <div key={liability.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{liability.name}</h3>
                        <p className="text-sm text-muted-foreground">{liability.description}</p>
                      </div>
                      <span className="font-medium text-red-600">${liability.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-red-50 dark:bg-red-950">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Total Liabilities</h3>
                    <span className="font-bold text-red-600">${totalLiabilities.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Net Worth Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Net Worth Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Assets</p>
              <p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-600">${totalLiabilities.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Net Worth</p>
              <p className="text-3xl font-bold text-primary">${netWorth.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}