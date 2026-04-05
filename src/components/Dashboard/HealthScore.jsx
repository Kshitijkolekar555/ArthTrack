import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateHealthScore, getHealthStatus } from '../../utils/HealthScoreEngine';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

const HealthScore = () => {
  const { transactions, budgets } = useFinance();
  const score = calculateHealthScore(transactions, budgets);
  const status = getHealthStatus(score);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-6 relative overflow-hidden group">
      {/* Background decoration */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${status.color}-500/5 rounded-full blur-3xl group-hover:bg-${status.color}-500/10 transition-colors`} />
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
          {/* Circular Progress SVG */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-zinc-800"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={364.4}
              initial={{ strokeDashoffset: 364.4 }}
              animate={{ strokeDashoffset: 364.4 - (364.4 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`text-${status.color}-500`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tighter">{score}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Score</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h3 className="text-lg font-bold text-white">Financial Health: {status.label}</h3>
            {score > 70 ? (
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            ) : score > 40 ? (
              <TrendingUp className="w-5 h-5 text-blue-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-md">
            {transactions.length === 0 
              ? "Welcome! Start logging your transactions to see your financial health score and personalized insights."
              : status.message + " Your score is calculated based on savings rate, budget adherence, and consistency."
            }
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Updated Real-time
            </div>
            {score < 100 && (
              <button className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 underline underline-offset-4 transition-colors">
                Improve your score →
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-px h-16 bg-zinc-800 mx-4"></div>

        <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Insights</p>
            <p className="text-sm text-white font-medium">Lower Food Exp.</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Tip</p>
            <p className="text-sm text-white font-medium">Save 20% +</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;
