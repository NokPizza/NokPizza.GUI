import './Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../Buttons/ThemeToggle/ThemeToggle';

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__logo" to="/">
          Nok<span>Pizza</span>
        </Link>
        <ThemeToggle theme={theme} onToggle={setTheme} />
      </div>
    </header>
  );
}
