"use client";

import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

// --- Components ---

const Navbar = ({ currentPage, navigateTo, toggleMobileMenu, isMobileMenuOpen, session, isMounted }: any) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TDS Data Labs</h1>
              <p className="text-xs text-gray-400">School AI Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['home', 'students', 'teachers', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`capitalize transition-colors ${currentPage === page ? 'text-white font-medium' : 'text-gray-300 hover:text-white'}`}
              >
                {page === 'home' ? 'Home' : page === 'students' ? 'For Students' : page === 'teachers' ? 'For Teachers' : 'Contact'}
              </button>
            ))}
            
            {/* Only render auth buttons after mounting to prevent hydration mismatch */}
            {isMounted && (
              <>
                {!session ? (
                  <button
                    onClick={() => navigateTo('login')}
                    className="px-6 py-2 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('chat')}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                  >
                    Open AI Tutor
                  </button>
                )}
              </>
            )}
          </div>

          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
            {['home', 'students', 'teachers', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className="block w-full text-left text-gray-300 hover:text-white py-2 capitalize"
              >
                {page}
              </button>
            ))}
            {isMounted && (
              <>
                {!session ? (
                  <button
                    onClick={() => navigateTo('login')}
                    className="block w-full text-left text-gray-300 hover:text-white py-2"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('chat')}
                    className="w-full px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium"
                  >
                    Open AI Tutor
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// --- Footer Component ---
const Footer = ({ navigateTo }: any) => (
  <footer className="bg-slate-950 border-t border-white/10 text-white">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold">TDS Data Labs</h3>
              <p className="text-xs text-gray-400">School AI Platform</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Transforming education with AI-powered learning solutions. Making quality education accessible to every student.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo('students')} className="text-gray-400 hover:text-white transition-colors">For Students</button></li>
            <li><button onClick={() => navigateTo('teachers')} className="text-gray-400 hover:text-white transition-colors">For Teachers</button></li>
            <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white transition-colors">Contact Us</button></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Resources</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-gray-400 text-sm">Tech Park, Innovation District, Mumbai, Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="text-gray-400 text-sm">schools@tdsdatalabs.com</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="text-gray-400 text-sm">+91 98765 43210</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 TDS Data Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Components ---

const LoginPage = ({ navigateTo }: any) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigateTo('chat');
      }
    };
    checkSession();
  }, [navigateTo]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Account created! You can now log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigateTo('chat');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-4">
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-gray-400 text-sm mt-2">
            {isSignUp ? "Sign up to start your learning journey" : "Sign in to continue to your dashboard"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:border-teal-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ navigateTo }: any) => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section with Image */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>Powered by Advanced AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The Future of Learning is{' '}
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Personalized
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empowering students and assisting teachers with the world&apos;s most advanced School AI. Get instant answers, personalized learning paths, and 24/7 academic support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigateTo('login')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Try the AI Tutor
            </button>
            <button onClick={() => navigateTo('contact')} className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-medium text-lg hover:bg-white/20 transition-all">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="relative">
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* AI Chat Preview */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">TDS AI Tutor</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-2xl p-4 max-w-[80%]">
                  <p className="text-sm">How do I solve quadratic equations?</p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 rounded-2xl p-4 ml-auto max-w-[90%]">
                  <p className="text-sm">Great question! Let me break it down step by step. A quadratic equation has the form ax² + bx + c = 0. You can solve it using the quadratic formula...</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <div className="flex-1 bg-white/5 rounded-xl p-3 text-sm text-gray-400">
                  Ask me anything...
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>

            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
        <StatCard number="50K+" label="Active Students" />
        <StatCard number="1M+" label="Questions Answered" />
        <StatCard number="500+" label="Schools" />
        <StatCard number="98%" label="Satisfaction Rate" />
      </div>

      {/* Features Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            TDS Data Labs?
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Our AI-powered platform provides comprehensive learning solutions for modern education.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-32">
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
          title="Instant Doubt Solving"
          desc="24/7 answers for homework with step-by-step explanations that help students truly understand concepts."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
          title="Teacher Assistant"
          desc="Auto-grading, lesson planning, and analytics to help teachers focus on what matters most—teaching."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>}
          title="Safe & Secure"
          desc="Data privacy optimized for schools with secure, compliant infrastructure protecting student information."
        />
      </div>

      {/* How It Works Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard 
            number="1"
            title="Sign Up"
            desc="Create your account in seconds. Students, teachers, and schools can all get started for free."
            color="from-teal-500 to-blue-600"
          />
          <StepCard 
            number="2"
            title="Ask Questions"
            desc="Type or speak your questions. Upload images of problems. Our AI understands it all."
            color="from-purple-500 to-pink-500"
          />
          <StepCard 
            number="3"
            title="Learn & Grow"
            desc="Get personalized explanations and track your progress as you master new concepts."
            color="from-orange-500 to-red-500"
          />
        </div>
      </div>

      {/* Subjects Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            All Subjects{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Covered
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From Mathematics to Literature, we have got you covered
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <SubjectCard icon="📐" name="Mathematics" />
          <SubjectCard icon="🔬" name="Science" />
          <SubjectCard icon="📚" name="English" />
          <SubjectCard icon="🌍" name="Geography" />
          <SubjectCard icon="📜" name="History" />
          <SubjectCard icon="💻" name="Computer Science" />
          <SubjectCard icon="⚗️" name="Chemistry" />
          <SubjectCard icon="🔭" name="Physics" />
          <SubjectCard icon="🧬" name="Biology" />
          <SubjectCard icon="🎨" name="Art" />
          <SubjectCard icon="🎵" name="Music" />
          <SubjectCard icon="🗣️" name="Languages" />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="TDS AI helped me improve my math grades from C to A in just two months. The step-by-step explanations are amazing!"
            name="Priya Sharma"
            role="Class 10 Student"
            avatar="👩‍🎓"
          />
          <TestimonialCard 
            quote="As a teacher, this tool saves me hours every week on lesson planning and grading. It's like having a personal assistant!"
            name="Rajesh Kumar"
            role="Physics Teacher"
            avatar="👨‍🏫"
          />
          <TestimonialCard 
            quote="Our school's overall performance improved by 25% after implementing TDS Data Labs. Highly recommended!"
            name="Dr. Anjali Mehta"
            role="School Principal"
            avatar="👩‍💼"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="backdrop-blur-xl bg-gradient-to-r from-teal-500/10 to-blue-600/10 border border-white/10 rounded-3xl p-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of students and teachers who are already using TDS Data Labs to achieve better results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigateTo('login')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all">
            Get Started Free
          </button>
          <button onClick={() => navigateTo('contact')} className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-medium text-lg hover:bg-white/20 transition-all">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>

    <Footer navigateTo={navigateTo} />
  </div>
);

const StudentsPage = ({ navigateTo }: any) => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
    {/* Animated Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>For Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Personal Tutor,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Available 24/7
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Never get stuck on homework again. Learn smarter, not harder with AI-powered explanations tailored just for you.
          </p>
          <button onClick={() => navigateTo('login')} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Start Learning Now
          </button>
        </div>

        {/* Student Illustration */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍🎓</div>
                <p className="text-gray-300">Students Learning Together</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 backdrop-blur-xl bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎯</div>
              <div>
                <p className="font-bold">98% Success Rate</p>
                <p className="text-sm opacity-80">In improving grades</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>}
          title="Homework Helper"
          desc="Stuck on a math problem? Snap a photo or type it in. Our AI doesn't just give the answer—it teaches you the steps so you understand the concept."
          actionText="Try it now"
        />
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
          title="Exam Prep"
          desc="Generate custom quizzes based on your textbook chapters. Practice unlimited questions and get instant feedback to prepare for exams."
          actionText="Start practicing"
        />
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>}
          title="Concept Simplifier"
          desc="Confused by Physics or Chemistry? Ask TDS AI to explain it like you are 10 years old and get crystal clear explanations."
          actionText="Ask a question"
        />
        <StudentFeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>}
          title="Progress Tracking"
          desc="See your learning journey with detailed analytics. Track which topics you have mastered and where you need more practice."
          actionText="View dashboard"
        />
      </div>

      {/* Image Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-6xl">📱</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Learn Anywhere, Anytime</h3>
            <p className="text-gray-400">Access your AI tutor from any device - phone, tablet, or computer.</p>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="w-full h-64 bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center">
            <div className="text-6xl">📝</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">Personalized Learning Path</h3>
            <p className="text-gray-400">AI adapts to your learning style and pace for optimal results.</p>
          </div>
        </div>
      </div>
    </div>

    <Footer navigateTo={navigateTo} />
  </div>
);

const TeachersPage = ({ navigateTo }: any) => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white">
    {/* Animated Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>For Educators</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Teach More.{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Grade Less.
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empower your teaching with AI-driven tools that save time and enhance learning outcomes for your students.
          </p>
          <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all">
            Request Demo
          </button>
        </div>

        {/* Teacher Illustration */}
        <div className="relative">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="w-full h-64 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👩‍🏫</div>
                <p className="text-gray-300">Teacher in Classroom</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⏰</div>
              <div>
                <p className="font-bold">10+ Hours Saved</p>
                <p className="text-sm opacity-80">Per week on grading</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
          title="Lesson Planning"
          desc="Generate comprehensive lesson plans, worksheets, and slide decks in seconds. Customize to match your teaching style and curriculum."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
          title="Automated Grading"
          desc="Upload student essays and get instant feedback on grammar, structure, and factual accuracy. Save hours every week on assessments."
        />
        <FeatureCard 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>}
          title="Student Insights"
          desc="Track which concepts your class is struggling with using detailed analytics. Personalize your teaching approach based on data."
        />
      </div>

      {/* Dashboard Preview */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Powerful Teacher Dashboard</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">142</p>
                <p className="text-gray-400 text-sm">Total Students</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-gray-400 text-sm">Avg. Completion</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">12hrs</p>
                <p className="text-gray-400 text-sm">Time Saved/Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer navigateTo={navigateTo} />
  </div>
);

const ContactPage = ({ navigateTo }: any) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Partner with{' '}
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              TDS Data Labs
            </span>
          </h1>
          <p className="text-xl text-gray-300">Let us transform education together. Get in touch with our team.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <ContactInfoItem 
                icon={<><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></>}
                title="Headquarters"
                details="Tech Park, Innovation District, Mumbai, Maharashtra, India"
              />
              <ContactInfoItem 
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>}
                title="Email"
                details="schools@tdsdatalabs.com"
              />
              <ContactInfoItem 
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>}
                title="Phone"
                details="+91 98765 43210"
              />
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-teal-500/20 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📍</div>
                <p className="text-gray-400">Mumbai, India</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" required className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white placeholder-gray-500" />
              <input type="email" placeholder="Your Email" required className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white placeholder-gray-500" />
              <input type="text" placeholder="School Name" required className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white placeholder-gray-500" />
              <select className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all text-white">
                <option value="" className="bg-slate-800">Select Inquiry Type</option>
                <option value="demo" className="bg-slate-800">Request a Demo</option>
                <option value="pricing" className="bg-slate-800">Pricing Information</option>
                <option value="partnership" className="bg-slate-800">Partnership Inquiry</option>
                <option value="support" className="bg-slate-800">Technical Support</option>
                <option value="other" className="bg-slate-800">Other</option>
              </select>
              <textarea 
                placeholder="Your Message" 
                rows={4} 
                required 
                className="w-full p-4 bg-white/5 border border-white/20 rounded-lg outline-none focus:border-teal-500/50 transition-all resize-none text-white placeholder-gray-500"
              ></textarea>
              <button type="submit" className="w-full p-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer navigateTo={navigateTo} />
    </div>
  );
};

const ChatPage = ({ initialMessage, navigateTo }: any) => {
  const [messages, setMessages] = useState([{ type: 'ai', text: "Hello! I'm School AI by TDS Data Labs. How can I help you today?" }]);
  const [inputValue, setInputValue] = useState(initialMessage || "");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://n8nclient.in/webhook/school_ai?message=" + encodeURIComponent(userText));
      const text = await response.text();
      setMessages(prev => [...prev, { type: 'ai', text: text || "No answer returned" }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: "⚠️ Error connecting to School AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigateTo('home');
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportChat = () => {
    const textContent = messages.map(m => `${m.type.toUpperCase()}: ${m.text}`).join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tds-chat-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white pt-20 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full h-full">
        {/* Chat Header */}
        <div className="p-6 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">TDS AI Tutor</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleLogout} className="px-4 py-2 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/10 transition-all text-sm">
                Logout
              </button>
              <button onClick={exportChat} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-all flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-4 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'backdrop-blur-xl bg-white/10 border border-white/20'}`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 backdrop-blur-xl bg-white/5 border-t border-white/10">
          <div className="flex gap-3 items-end">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all resize-none text-white placeholder-gray-500"
              rows={1}
            ></textarea>
            <button onClick={handleSendMessage} className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ number, label }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
    <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">{number}</p>
    <p className="text-gray-400">{label}</p>
  </div>
);

const StepCard = ({ number, title, desc, color }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
    <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold`}>
      {number}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const SubjectCard = ({ icon, name }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-sm text-gray-300">{name}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, avatar }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
    <div className="text-4xl mb-4">&ldquo;</div>
    <p className="text-gray-300 mb-6 italic">{quote}</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-2xl">
        {avatar}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
);

const StudentFeatureCard = ({ icon, title, desc, actionText }: any) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-300 mb-4">{desc}</p>
    <div className="flex items-center gap-2 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
      <span>{actionText}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  </div>
);

const ContactInfoItem = ({ icon, title, details }: any) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-300">{details}</p>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatInitialMessage, setChatInitialMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false); // Key fix for hydration

  useEffect(() => {
    // Set mounted state to true after component mounts
    setIsMounted(true);
    
    supabase.auth.getSession().then((response: any) => {
      setSession(response.data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateTo = (page: string, initialMsg = '') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === 'chat' && initialMsg) {
      setChatInitialMessage(initialMsg);
    } else if (page !== 'chat') {
      setChatInitialMessage('');
    }
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
        session={session}
        isMounted={isMounted}
      />

      <main>
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'students' && <StudentsPage navigateTo={navigateTo} />}
        {currentPage === 'teachers' && <TeachersPage navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactPage navigateTo={navigateTo} />}
        {currentPage === 'chat' && <ChatPage initialMessage={chatInitialMessage} navigateTo={navigateTo} />}
        {currentPage === 'login' && <LoginPage navigateTo={navigateTo} />}
      </main>
    </div>
  );
};

export default App;