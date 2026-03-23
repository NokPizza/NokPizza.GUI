import './ThemeToggle.css';

type Props = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

function SunIcon() {
  return (
    <svg className="theme-toggle__icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-toggle__icon" viewBox="0 0 24 24">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
