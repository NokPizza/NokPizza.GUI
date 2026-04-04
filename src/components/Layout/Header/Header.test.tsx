import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

const renderWithRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  );
});

describe('Header', () => {
  describe('logo', () => {
    it('renders NokPizza logo link', () => {
      renderWithRoute('/');
      expect(screen.getByRole('link', { name: /nokpizza/i })).toBeInTheDocument();
    });

    it('logo links to /', () => {
      renderWithRoute('/');
      expect(screen.getByRole('link', { name: /nokpizza/i })).toHaveAttribute('href', '/');
    });
  });

  describe('rendering', () => {
    it.each(['/', '/some-page'])('renders the sticky header on %s', path => {
      renderWithRoute(path);

      expect(screen.getByRole('banner')).toHaveClass('header');
      expect(screen.getByRole('link', { name: /nokpizza/i })).toBeInTheDocument();
    });
  });

  describe('theme', () => {
    it('defaults to light theme when no preference saved', () => {
      renderWithRoute('/');
      expect(screen.getByLabelText('Lyst tema')).toHaveAttribute('aria-pressed', 'true');
    });

    it('restores saved theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      renderWithRoute('/');
      expect(screen.getByLabelText('Mørkt tema')).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
