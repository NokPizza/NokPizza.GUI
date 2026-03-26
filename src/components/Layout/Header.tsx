import './Header.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from '../Buttons/ThemeToggle/ThemeToggle';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const visible = !isHome || scrolled;

  return (
    <header className={`header${visible ? ' header--visible' : ''}${scrolled || !isHome ? ' header--bg' : ''}`}>
      <div className="header__inner">
        <a className="header__logo" href="/">
          Nok<span>Pizza</span>
        </a>
        <ThemeToggle theme={theme} onToggle={setTheme} />
      </div>
    </header>
  );
}
