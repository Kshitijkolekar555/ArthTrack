import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  ArrowRight,
  TrendingUp,
  PieChart,
  Layout
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const features = [
  {
    icon: BarChart3,
    title: "Smart Insights",
    desc: "AI-powered analysis of your spending habits and financial health."
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "Your data is encrypted and stored locally for maximum privacy."
  },
  {
    icon: Zap,
    title: "Instant Tracking",
    desc: "Log transactions in seconds with our optimized interface."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // If already logged in, we might want to redirect, 
  // but usually users want to see the landing page too.
  // We'll let them click "Get Started" to go to dashboard.

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">ArthTrack</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign In</Link>
          <Link 
            to="/register" 
            className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-8">
            <TrendingUp className="w-3 h-3" />
            Introducing ArthTrack Finance Suite
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Master Your Money <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent italic">With Precision.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience the next generation of personal finance. Track, analyze, and optimize your wealth with our industry-grade suite designed for clarity and speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group active:scale-[0.98]"
            >
              Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Floating Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10" />
          <div className="bg-zinc-900/50 backdrop-blur-3xl border border-zinc-800 rounded-[2.5rem] p-4 md:p-8 shadow-2xl overflow-hidden">
             {/* Mini Dashboard Mockup */}
             <div className="grid grid-cols-4 gap-3 mb-4">
               {[
                 { label: 'Balance', value: '₹67,850', color: 'text-emerald-400' },
                 { label: 'Income', value: '₹1,15,000', color: 'text-green-400' },
                 { label: 'Expenses', value: '₹47,150', color: 'text-red-400' },
                 { label: 'Savings', value: '59%', color: 'text-cyan-400' },
               ].map((card, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 + i * 0.1 }}
                   className="bg-zinc-800/60 border border-zinc-700/50 rounded-2xl p-3 md:p-4"
                 >
                   <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider mb-1">{card.label}</p>
                   <p className={`text-sm md:text-lg font-bold ${card.color}`}>{card.value}</p>
                 </motion.div>
               ))}
             </div>
             <div className="grid grid-cols-5 gap-3">
               {/* Chart Area */}
               <div className="col-span-3 bg-zinc-800/40 border border-zinc-700/30 rounded-2xl p-4 h-32 md:h-40 flex items-end gap-1">
                 {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                   <motion.div
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ delay: 0.6 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                     className="flex-1 bg-gradient-to-t from-emerald-500/80 to-emerald-500/20 rounded-t-sm"
                   />
                 ))}
               </div>
               {/* Pie Chart Area */}
               <div className="col-span-2 bg-zinc-800/40 border border-zinc-700/30 rounded-2xl p-4 h-32 md:h-40 flex items-center justify-center">
                 <div className="relative w-20 h-20 md:w-28 md:h-28">
                   <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                     <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
                     <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 100 }} transition={{ delay: 0.8, duration: 1 }} strokeLinecap="round" />
                     <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 180 }} transition={{ delay: 1, duration: 0.8 }} strokeLinecap="round" />
                     <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="18" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 220 }} transition={{ delay: 1.2, duration: 0.6 }} strokeLinecap="round" />
                   </svg>
                 </div>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-800 hover:border-emerald-500/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 transition-colors">
                <f.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-32 px-6 bg-zinc-900/10 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Designed for the <br /> modern engineer.</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              We built ArthTrack with speed in mind. Our interface is clean, dark, and extremely responsive. No more fighting with bloated financial apps.
            </p>
            <div className="space-y-4">
              {['Real-time calculations', 'Encrypted local storage', 'Cross-device compatibility'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-emerald-500" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15),transparent)]" />
               <div className="relative z-10 space-y-3">
                 {/* Mock sidebar + content */}
                 <div className="flex gap-3">
                   <div className="w-1/4 space-y-2">
                     <div className="h-8 bg-emerald-500/20 rounded-lg border border-emerald-500/30" />
                     <div className="h-6 bg-zinc-800/80 rounded-lg" />
                     <div className="h-6 bg-zinc-800/80 rounded-lg" />
                     <div className="h-6 bg-zinc-800/80 rounded-lg" />
                   </div>
                   <div className="flex-1 space-y-2">
                     <div className="h-8 bg-zinc-800/60 rounded-lg" />
                     <div className="grid grid-cols-3 gap-2">
                       <div className="h-16 bg-zinc-800/40 rounded-xl border border-zinc-700/30 p-2">
                         <div className="h-2 w-12 bg-zinc-700 rounded mb-1" />
                         <div className="h-3 w-16 bg-emerald-500/40 rounded" />
                       </div>
                       <div className="h-16 bg-zinc-800/40 rounded-xl border border-zinc-700/30 p-2">
                         <div className="h-2 w-12 bg-zinc-700 rounded mb-1" />
                         <div className="h-3 w-14 bg-green-500/40 rounded" />
                       </div>
                       <div className="h-16 bg-zinc-800/40 rounded-xl border border-zinc-700/30 p-2">
                         <div className="h-2 w-12 bg-zinc-700 rounded mb-1" />
                         <div className="h-3 w-10 bg-red-500/40 rounded" />
                       </div>
                     </div>
                     <div className="h-28 bg-zinc-800/30 rounded-xl border border-zinc-700/20 flex items-end p-3 gap-1">
                       {[30, 50, 35, 65, 45, 70, 55, 80].map((h, i) => (
                         <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/60 to-emerald-500/10 rounded-t-sm" style={{ height: `${h}%` }} />
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-zinc-900 text-center">
         <p className="text-zinc-600 text-sm mb-2">© 2024 ArthTrack Finance Suite. Built for the future of finance.</p>
         <div className="text-zinc-700 text-xs font-semibold uppercase tracking-widest">
           Bespoke Submission for Zorvyn Frontend Internship • Kshitij Kolekar
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
