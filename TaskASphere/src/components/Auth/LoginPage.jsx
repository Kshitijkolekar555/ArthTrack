import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Enter your credentials');
      return;
    }
    setError('');
    
    try {
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        alert('User not found! Please check your email or contact support.');
        setError('User not found. Try admin@arthtrack.com');
      } else if (err.message === 'INVALID_PASSWORD') {
        setError('Invalid password. Try admin123');
      } else {
        setError('Login failed. Try again.');
      }
    }
  };

  const handleDemoLogin = async () => {
    setEmail('admin@arthtrack.com');
    setPassword('admin123');
    try {
      await login('admin@arthtrack.com', 'admin123');
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    } catch (err) {
      setError('Demo login failed. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 select-none overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="text-center relative z-10"
        >
          <motion.div
             initial={{ rotate: -20, scale: 0 }}
             animate={{ rotate: 0, scale: 1 }}
             transition={{ type: 'spring', damping: 12, delay: 0.1 }}
             className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40"
          >
            <Trophy className="text-white w-12 h-12" />
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-3 tracking-tight"
          >
            Authenticated!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 text-lg"
          >
            Preparing your personal finance suite...
          </motion.p>
          
          {/* Enhanced Particle burst */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 600, 
                y: (Math.random() - 0.5) * 600,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-teal-400'}`}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "premium" feel
        }}
        className="w-full max-w-md z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-6 shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="text-white w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Access your ArthTrack Finance Suite</p>
        </motion.div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl animate-shake">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-3 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-2xl py-3.5 font-medium hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
          >
            Quick Demo Login <Sparkles className="w-4 h-4 text-emerald-500 group-hover:animate-pulse" />
          </button>

          <p className="mt-8 text-center text-zinc-500 text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="text-white hover:text-emerald-400 font-medium underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-500 transition-all">
              Create one now
            </Link>
          </p>
        </div>

        <footer className="mt-12 text-center text-zinc-600 text-xs">
          © 2024 ArthTrack Finance Suite.
          <div className="mt-2 text-zinc-700 font-medium">Bespoke Submission for Zorvyn Internship</div>
        </footer>
      </motion.div>
    </div>
  );
};

export default LoginPage;
