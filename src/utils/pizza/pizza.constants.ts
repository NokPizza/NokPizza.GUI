import type { HungerLevel } from 'src/types/pizza.type';

export const SLICES_PER_PIZZA = 8;

export const HUNGER_OPTIONS: { value: HungerLevel; label: string }[] = [
  { value: 'light', label: 'Småsulten' },
  { value: 'normal', label: 'Sulten' },
  { value: 'very_hungry', label: 'Skrubbsulten' },
];

export const SLICES_PER_PERSON: Record<HungerLevel, number> = {
  light: 2,
  normal: 3,
  very_hungry: 5,
};
