import { describe, expect, it } from 'vitest';

import { calculatePizzasNeeded } from './pizzaCalculator';

describe('calculatePizzasNeeded', () => {
  it('rounds up when slices do not divide evenly', () => {
    // 1 person * 3 slices = 3 slices → ceil(3/8) = 1
    expect(calculatePizzasNeeded(1, 'normal')).toBe(1);
  });

  it('calculates correctly for light hunger', () => {
    // 8 people * 2 slices = 16 slices → ceil(16/8) = 2
    expect(calculatePizzasNeeded(8, 'light')).toBe(2);
  });

  it('calculates correctly for normal hunger', () => {
    // 8 people * 3 slices = 24 slices → ceil(24/8) = 3
    expect(calculatePizzasNeeded(8, 'normal')).toBe(3);
  });

  it('calculates correctly for very hungry', () => {
    // 8 people * 4 slices = 32 slices → ceil(32/8) = 4
    expect(calculatePizzasNeeded(8, 'very_hungry')).toBe(4);
  });

  it('throws for zero people', () => {
    expect(() => calculatePizzasNeeded(0, 'normal')).toThrow('Invalid number of people');
  });

  it('throws for negative people', () => {
    expect(() => calculatePizzasNeeded(-1, 'normal')).toThrow('Invalid number of people');
  });

  it('throws for non-finite input', () => {
    expect(() => calculatePizzasNeeded(Infinity, 'normal')).toThrow('Invalid number of people');
    expect(() => calculatePizzasNeeded(NaN, 'normal')).toThrow('Invalid number of people');
  });
});
