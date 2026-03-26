import { useState } from 'react';
import './Index.css';
import { NumberInput } from '../../components/Inputs/NumberInput/NumberInput';
import { calculatePizzasNeeded } from '../../utils/pizza/pizzaCalculator';
import { HUNGER_OPTIONS, SLICES_PER_PERSON } from '../../utils/pizza/pizza.constants';
import type { HungerLevel } from '../../types/pizza.type';
import heroImg from '../../assets/hero.jpg';

const HUNGER_CARDS: Record<HungerLevel, { emoji: string; description: string }> = {
  light: { emoji: '🍕', description: 'Et par biter holder' },
  normal: { emoji: '🍕🍕', description: 'En skikkelig porsjon' },
  very_hungry: { emoji: '🍕🍕🍕', description: 'Alt du har!' },
};

const Index = () => {
  const [people, setPeople] = useState<number | null>(1);
  const [hungerLevel, setHungerLevel] = useState<HungerLevel>('normal');

  const pizzas = people !== null ? calculatePizzasNeeded(people, hungerLevel) : null;
  const totalSlices = people !== null ? people * SLICES_PER_PERSON[hungerLevel] : null;

  return (
    <>
      <div className="hero">
        <img src={heroImg} alt="Deilige pizzaer" className="hero__img" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">
            Nok<span>Pizza</span>
          </h1>
          <p className="hero__tagline">
            Finn ut nøyaktig hvor mange pizzaer du trenger – aldri for lite, aldri for mye.
          </p>
        </div>
      </div>

      <div className="app">
        <main className="content card">
          <NumberInput label="Antall personer" value={people} onChange={setPeople} />

          <div className="hunger-selector">
            <label className="hunger-selector__label">Hvor sulten?</label>
            <div className="hunger-selector__cards">
              {HUNGER_OPTIONS.map(option => {
                const card = HUNGER_CARDS[option.value];
                return (
                  <button
                    key={option.value}
                    className={`hunger-card${hungerLevel === option.value ? ' hunger-card--active' : ''}`}
                    onClick={() => setHungerLevel(option.value)}
                  >
                    <span className="hunger-card__emoji">{card.emoji}</span>
                    <span className="hunger-card__label">{option.label}</span>
                    <span className="hunger-card__desc">{card.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {pizzas !== null && totalSlices !== null && (
            <div className="result">
              <span className="result-bg-emoji" aria-hidden="true">
                🍕
              </span>
              <span className="result-label">Dere trenger</span>
              <span className="result-number">{pizzas}</span>
              <span className="result-unit">{pizzas === 1 ? 'pizza' : 'pizzaer'}</span>
              <span className="result-detail">
                ({totalSlices} pizzastykker til {people} {people === 1 ? 'person' : 'personer'})
              </span>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Index;
