import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('visibility', () => {
    it('is visible on home without scrolling', () => {
      renderWithRoute('/');
      expect(document.querySelector('.header')).toBeInTheDocument();
      expect(document.querySelector('.header')).not.toHaveClass('header--visible');
      expect(document.querySelector('.header')).not.toHaveClass('header--bg');
    });

    it('stays visible after scrolling on home', () => {
      renderWithRoute('/');
      fireEvent.scroll(window, { target: { scrollY: 201 } });
      expect(document.querySelector('.header')).toBeInTheDocument();
      expect(document.querySelector('.header')).not.toHaveClass('header--visible');
      expect(document.querySelector('.header')).not.toHaveClass('header--bg');
    });

    it('uses the same behavior on non-home routes', () => {
      renderWithRoute('/some-page');
      expect(document.querySelector('.header')).toBeInTheDocument();
      expect(document.querySelector('.header')).not.toHaveClass('header--visible');
      expect(document.querySelector('.header')).not.toHaveClass('header--bg');
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
