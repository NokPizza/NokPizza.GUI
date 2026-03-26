import './Header.css';
import { ThemeToggle } from '../Buttons/ThemeToggle/ThemeToggle';

type Props = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="/">
          <img src="/favicon.png" alt="NokPizza logo" className="header__logo-img" />Nok<span>Pizza</span>
        </a>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
