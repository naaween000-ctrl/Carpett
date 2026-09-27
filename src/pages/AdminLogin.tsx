import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SEO } from '../components/ui/SEO';
import { Logo } from '../components/ui/Logo';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@tajmahalcarpet.com');
  const [password, setPassword] = useState('tajmahal123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (!authLoading && isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error signing in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4 relative overflow-hidden">
      <SEO title="Admin Login | Taj Mahal Carpet" description="Taj Mahal Carpet Showroom Admin Authentication Portal" />

      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-burgundy-900/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md dark-glass-card rounded-3xl p-8 shadow-2xl border border-gold-500/30 relative z-10 text-warm-ivory">
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <Logo size="lg" className="mx-auto mb-2" />
          <h1 className="font-serif text-2xl font-bold tracking-wider text-warm-ivory">Taj Mahal Carpet</h1>
          <p className="text-xs text-stone-400">Showroom Management & Lead Portal</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-red-900/40 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block text-stone-300 font-medium mb-1.5">Admin Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@tajmahalcarpet.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900/80 border border-gold-500/30 text-warm-ivory placeholder-stone-500 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900/80 border border-gold-500/30 text-warm-ivory placeholder-stone-500 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-burgundy-950/60 border border-gold-500/20 text-[11px] text-stone-300 leading-relaxed">
            <span className="font-bold text-gold-400 block mb-0.5">Demo Credentials Notice:</span>
            <span>Email: admin@tajmahalcarpet.com</span>
            <br />
            <span>Password: tajmahal123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-900 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin Portal</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
