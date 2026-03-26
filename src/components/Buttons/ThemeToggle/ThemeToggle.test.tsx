import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  const onToggle = vi.fn();

  beforeEach(() => onToggle.mockClear());

  describe('light theme', () => {
    it('renders both buttons', () => {
      render(<ThemeToggle theme="light" onToggle={onToggle} />);
      expect(screen.getByLabelText('Lyst tema')).toBeInTheDocument();
      expect(screen.getByLabelText('Mørkt tema')).toBeInTheDocument();
    });

    it('marks light button as pressed', () => {
      render(<ThemeToggle theme="light" onToggle={onToggle} />);
      expect(screen.getByLabelText('Lyst tema')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByLabelText('Mørkt tema')).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onToggle with "dark" when dark button is clicked', async () => {
      render(<ThemeToggle theme="light" onToggle={onToggle} />);
      await userEvent.click(screen.getByLabelText('Mørkt tema'));
      expect(onToggle).toHaveBeenCalledWith('dark');
    });

    it('calls onToggle with "light" when light button is clicked', async () => {
      render(<ThemeToggle theme="light" onToggle={onToggle} />);
      await userEvent.click(screen.getByLabelText('Lyst tema'));
      expect(onToggle).toHaveBeenCalledWith('light');
    });
  });

  describe('dark theme', () => {
    it('marks dark button as pressed', () => {
      render(<ThemeToggle theme="dark" onToggle={onToggle} />);
      expect(screen.getByLabelText('Mørkt tema')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByLabelText('Lyst tema')).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onToggle with "light" when light button is clicked', async () => {
      render(<ThemeToggle theme="dark" onToggle={onToggle} />);
      await userEvent.click(screen.getByLabelText('Lyst tema'));
      expect(onToggle).toHaveBeenCalledWith('light');
    });
  });
});
