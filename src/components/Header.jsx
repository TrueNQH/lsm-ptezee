import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Container component
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Brand Logo component
const BrandLogo = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 64" width="32" height="32" aria-hidden>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)"/>
    <path d="M18 40L30 22l8 10 8-10 2 28H18Z" fill="white" opacity="0.95" />
  </svg>
);

// Button components
const PrimaryButton = ({ children, href = "#", onClick, to }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
        style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)" }}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
      style={{ background: "linear-gradient(135deg, #0284c7, #06b6d4)" }}
    >
      {children}
    </a>
  );
};

const SecondaryButton = ({ children, href = "#" }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-2xl border border-sky-200/70 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
  >
    {children}
  </a>
);

// Simple i18n function
const useI18n = () => {
  const t = (key) => {
    const translations = {
      brand: "DLA LMS",
      navAbout: "About us",
      navMaterials: "Learning Material", 
      navAuth: "Sign up/Sign in"
    };
    return translations[key] || key;
  };
  return { t };
};

// Simple Language Menu (placeholder)
const LanguageMenu = ({ lang, onChange }) => (
  <div className="flex items-center gap-2 rounded-xl border border-sky-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-700">
    <Globe className="h-4 w-4 text-sky-600" /> VI
  </div>
);

export default function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useI18n()

  const handleGuestLogin = () => {
    localStorage.setItem('user', JSON.stringify({ role: 'guest', name: 'Guest User' }))
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-30 bg-white/85 shadow-sm backdrop-blur">
      <div className="h-0.5 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400" />
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-slate-900">{t("brand")}</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#about" className="text-sm text-slate-600 hover:text-slate-900">{t("navAbout")}</a>
          <a href="#materials" className="text-sm text-slate-600 hover:text-slate-900">{t("navMaterials")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageMenu />
          {user?.role === 'guest' ? (
            <>
              <SecondaryButton href="/login">Đăng nhập</SecondaryButton>
              <PrimaryButton href="#register">Bắt đầu <ArrowRight className="h-4 w-4" /></PrimaryButton>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">Xin chào, {user?.name}</span>
              <SecondaryButton onClick={logout}>Đăng xuất</SecondaryButton>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}