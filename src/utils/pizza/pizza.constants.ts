import type { HungerLevel } from 'src/types/pizza.type';

export const SLICES_PER_PIZZA = 8;

export const SLICES_PER_PERSON: Record<HungerLevel, number> = {
  light: 2,
  normal: 3,
  very_hungry: 4,
};
