import { SLICES_PER_PIZZA, SLICES_PER_PERSON } from './pizza.constants';

import type { HungerLevel } from 'src/types/pizza.type';

/**
 * Calculates the number of pizzas needed based on the number of people and their hunger level.
 *
 * @param numPeople Number of people to feed
 * @param hungerLevel Hunger level of the people (light, normal, very_hungry)
 *
 * @returns Number of pizzas needed
 *
 * @throws Will throw an error if the number of people is not a positive finite number
 */
export function calculatePizzasNeeded(numPeople: number, hungerLevel: HungerLevel): number {
  if (!Number.isFinite(numPeople) || numPeople <= 0) {
    throw new Error('Invalid number of people');
  }

  const slicesPerPerson = SLICES_PER_PERSON[hungerLevel];
  const totalSlicesNeeded = numPeople * slicesPerPerson;

  return Math.ceil(totalSlicesNeeded / SLICES_PER_PIZZA);
}
