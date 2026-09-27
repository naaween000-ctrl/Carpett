import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

const DEMO_ADMIN_KEY = 'tmc_admin_authenticated';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isDemoAuth = localStorage.getItem(DEMO_ADMIN_KEY) === 'true';
    if (isDemoAuth) {
      setIsAdmin(true);
      setUser({ id: 'demo-admin-id', email: 'admin@tajmahalcarpet.com' } as User);
      setLoading(false);
      return;
    }

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (localStorage.getItem(DEMO_ADMIN_KEY) === 'true') {
          setIsAdmin(true);
          setUser({ id: 'demo-admin-id', email: 'admin@tajmahalcarpet.com' } as User);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          setIsAdmin(Boolean(session?.user));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (localStorage.getItem(DEMO_ADMIN_KEY) === 'true') {
          setIsAdmin(true);
          setUser({ id: 'demo-admin-id', email: 'admin@tajmahalcarpet.com' } as User);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          setIsAdmin(Boolean(session?.user));
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // 1. Check fallback demo credentials first
    const isDemoEmail = email === 'admin@tajmahalcarpet.com' || email === 'naaween000@gmail.com';
    if (isDemoEmail && password === 'tajmahal123') {
      localStorage.setItem(DEMO_ADMIN_KEY, 'true');
      setIsAdmin(true);
      setUser({ id: 'demo-admin-id', email } as User);
      return { success: true };
    }

    // 2. Try Supabase Auth
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data.user) {
        setUser(data.user);
        setIsAdmin(true);
        return { success: true };
      }
      return { success: false, error: error?.message || 'Invalid login credentials' };
    }

    return { success: false, error: 'Invalid admin credentials. Use admin@tajmahalcarpet.com / tajmahal123' };
  };

  const logout = async () => {
    localStorage.removeItem(DEMO_ADMIN_KEY);
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return {
    user,
    session,
    isAdmin,
    loading,
    login,
    logout
  };
}
