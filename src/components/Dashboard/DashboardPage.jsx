import React from 'react'
import SummaryCards from './SummaryCards'
import BalanceChart from './BalanceChart'
import SpendingChart from './SpendingChart'
import HealthScore from './HealthScore'
import AddTransactionForm from '../Admin/AddTransactionForm'
import { useFinance } from '../../context/FinanceContext'
import { motion } from 'framer-motion'

function DashboardPage() {
  const { role } = useFinance()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HealthScore />
      
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BalanceChart />
        <SpendingChart />
      </div>

      {/* Only admin sees the add form */}
      {role === 'admin' && (
        <div className="mt-8">
          <AddTransactionForm />
        </div>
      )}
    </motion.div>
  )
}

export default DashboardPage
