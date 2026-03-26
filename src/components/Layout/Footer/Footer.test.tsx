import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 NokPizza/)).toBeInTheDocument();
  });

  it('renders the pizza emoji', () => {
    render(<Footer />);
    expect(screen.getByText(/🍕/)).toBeInTheDocument();
  });
});
