import React, { useMemo } from 'react'
import { useFinance } from '../../context/FinanceContext'
import { useSettings } from '../../context/SettingsContext'
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'

function SummaryCards() {
  const { transactions } = useFinance()
  const { formatCurrency } = useSettings()

  const { totalIncome, totalExpense, balance, savingsRate } = useMemo(() => {
    const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount || 0), 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0)
    const bal     = income - expense
    const rate    = income > 0 ? ((income - expense) / income) * 100 : 0

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: bal,
      savingsRate: Math.round(rate)
    }
  }, [transactions])

  const cards = [
    {
      title: 'Current Balance',
      value: formatCurrency(balance),
      sub: 'Net available funds',
      icon: Wallet,
      color: balance >= 0 ? 'text-blue-400' : 'text-red-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20'
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      sub: '+12.5% from last month',
      icon: ArrowUpRight,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpense),
      sub: '-2.4% from last month',
      icon: ArrowDownRight,
      color: 'text-red-400',
      bg: 'bg-red-500/5',
      border: 'border-red-500/20'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: savingsRate > 20 ? 'Above industry target' : 'Target: 20%+',
      icon: savingsRate > 0 ? TrendingUp : TrendingDown,
      color: savingsRate > 20 ? 'text-emerald-400' : 'text-amber-400',
      bg: 'bg-zinc-800/30',
      border: 'border-zinc-800'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            rotateX: 4,
            rotateY: -4,
            transition: { duration: 0.2 }
          }}
          className={`bg-zinc-900 border ${card.border} rounded-2xl p-5 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group cursor-default shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">{card.title}</p>
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <p className={`text-2xl font-bold tracking-tight mb-1 ${card.color}`}>
            {card.value}
          </p>
          <p className="text-[10px] text-zinc-500 font-medium">
            {card.sub}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default SummaryCards
