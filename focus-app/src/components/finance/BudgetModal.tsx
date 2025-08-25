"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Plus, Trash2 } from "lucide-react"
import { useFinance } from "@/contexts/FinanceContext"

interface BudgetModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BudgetCategory {
  id: string
  name: string
  amount: number
}

export function BudgetModal({ isOpen, onClose }: BudgetModalProps) {
  const { expenseCategories, monthlyIncome } = useFinance()
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(
    expenseCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      amount: cat.monthlyBudget
    }))
  )

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.amount, 0)
  const remainingIncome = monthlyIncome - totalBudgeted

  const updateCategoryAmount = (id: string, amount: number) => {
    setBudgetCategories(prev => 
      prev.map(cat => cat.id === id ? { ...cat, amount } : cat)
    )
  }

  const addNewCategory = () => {
    const newCategory: BudgetCategory = {
      id: Date.now().toString(),
      name: "New Category",
      amount: 0
    }
    setBudgetCategories(prev => [...prev, newCategory])
  }

  const removeCategory = (id: string) => {
    setBudgetCategories(prev => prev.filter(cat => cat.id !== id))
  }

  const applyFiftyThirtyTwenty = () => {
    const needs = monthlyIncome * 0.5
    const wants = monthlyIncome * 0.3
    
    setBudgetCategories([
      { id: "housing", name: "Housing", amount: needs * 0.6 },
      { id: "utilities", name: "Utilities", amount: needs * 0.15 },
      { id: "groceries", name: "Groceries", amount: needs * 0.25 },
      { id: "dining", name: "Dining Out", amount: wants * 0.4 },
      { id: "entertainment", name: "Entertainment", amount: wants * 0.3 },
      { id: "shopping", name: "Shopping", amount: wants * 0.3 },
    ])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Edit Budget</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="overflow-y-auto">
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="font-bold text-green-600">${monthlyIncome.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Budgeted</p>
                <p className="font-bold">${totalBudgeted.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className={`font-bold ${remainingIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(remainingIncome).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Quick Setup */}
            <div className="space-y-2">
              <h3 className="font-medium">Quick Setup</h3>
              <Button 
                variant="outline" 
                onClick={applyFiftyThirtyTwenty}
                className="w-full"
              >
                Apply 50/30/20 Rule
              </Button>
            </div>

            {/* Budget Categories */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Budget Categories</h3>
                <Button variant="outline" size="sm" onClick={addNewCategory}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Category
                </Button>
              </div>

              <div className="space-y-3">
                {budgetCategories.map((category) => (
                  <div key={category.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        value={category.name}
                        onChange={(e) => {
                          setBudgetCategories(prev =>
                            prev.map(cat => cat.id === category.id ? { ...cat, name: e.target.value } : cat)
                          )
                        }}
                        placeholder="Category name"
                        className="font-medium"
                      />
                    </div>
                    <div className="w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          value={category.amount}
                          onChange={(e) => updateCategoryAmount(category.id, Number(e.target.value) || 0)}
                          className="pl-8"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={onClose} className="flex-1">
                Save Budget
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}