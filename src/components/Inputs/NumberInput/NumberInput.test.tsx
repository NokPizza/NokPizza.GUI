import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  const onChange = vi.fn();

  beforeEach(() => onChange.mockClear());

  describe('rendering', () => {
    it('renders the label', () => {
      render(<NumberInput label="Antall personer" value={1} onChange={onChange} />);
      expect(screen.getByText('Antall personer')).toBeInTheDocument();
    });

    it('displays the current value', () => {
      render(<NumberInput label="Test" value={5} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('5');
    });

    it('displays empty string when value is null', () => {
      render(<NumberInput label="Test" value={null} onChange={onChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('decrement button', () => {
    const getDecrement = () => screen.getAllByRole('button')[0];

    it('is disabled when value equals min', () => {
      render(<NumberInput label="Test" value={1} onChange={onChange} />);
      expect(getDecrement()).toBeDisabled();
    });

    it('is disabled when value is null', () => {
      render(<NumberInput label="Test" value={null} onChange={onChange} />);
      expect(getDecrement()).toBeDisabled();
    });

    it('calls onChange with value - 1 when clicked', async () => {
      render(<NumberInput label="Test" value={5} onChange={onChange} />);
      await userEvent.click(getDecrement());
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('does not go below min', async () => {
      render(<NumberInput label="Test" value={2} min={2} onChange={onChange} />);
      expect(getDecrement()).toBeDisabled();
    });
  });

  describe('increment button', () => {
    const getIncrement = () => screen.getAllByRole('button')[1];

    it('calls onChange with value + 1 when clicked', async () => {
      render(<NumberInput label="Test" value={3} onChange={onChange} />);
      await userEvent.click(getIncrement());
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('increments from 0 when value is null', async () => {
      render(<NumberInput label="Test" value={null} onChange={onChange} />);
      await userEvent.click(getIncrement());
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });

  describe('text input', () => {
    it('calls onChange with null when cleared', async () => {
      render(<NumberInput label="Test" value={5} onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.clear(input);
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('calls onChange with parsed number on valid input', async () => {
      render(<NumberInput label="Test" value={null} onChange={onChange} />);
      await userEvent.type(screen.getByRole('textbox'), '8');
      expect(onChange).toHaveBeenCalledWith(8);
    });

    it('ignores values below min', async () => {
      render(<NumberInput label="Test" value={null} min={5} onChange={onChange} />);
      await userEvent.type(screen.getByRole('textbox'), '3');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('blocks non-digit key presses', async () => {
      render(<NumberInput label="Test" value={1} onChange={onChange} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('blocks minus sign', async () => {
      render(<NumberInput label="Test" value={1} onChange={onChange} />);
      await userEvent.type(screen.getByRole('textbox'), '-');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('blocks decimal point', async () => {
      render(<NumberInput label="Test" value={1} onChange={onChange} />);
      await userEvent.type(screen.getByRole('textbox'), '.');
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
