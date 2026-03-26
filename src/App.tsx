import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NumberInput } from './components/Inputs/NumberInput';
import NotFound from './pages/NotFound';
import { calculatePizzasNeeded } from './utils/pizza/pizzaCalculator';
import { HUNGER_OPTIONS, SLICES_PER_PERSON } from './utils/pizza/pizza.constants';
import type { HungerLevel } from './types/pizza.type';

import heroImg from './assets/hero.jpg';

const HUNGER_CARDS: { value: HungerLevel; emoji: string; description: string }[] = [
  { value: 'light', emoji: '🍕', description: 'Et par biter holder' },
  { value: 'normal', emoji: '🍕🍕', description: 'En skikkelig porsjon' },
  { value: 'very_hungry', emoji: '🍕🍕🍕', description: 'Alt du har!' },
];

function App() {
  const [people, setPeople] = useState<number | null>(1);
  const [hungerLevel, setHungerLevel] = useState<HungerLevel>('normal');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const theme = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.className = theme;
  }, []);

  const pizzas = people !== null ? calculatePizzasNeeded(people, hungerLevel) : null;
  const totalSlices = people !== null ? people * SLICES_PER_PERSON[hungerLevel] : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home people={people} setPeople={setPeople} hungerLevel={hungerLevel} setHungerLevel={setHungerLevel} pizzas={pizzas} totalSlices={totalSlices} />} />
      </Routes>
    </BrowserRouter>
  );
}

type HomeProps = {
  people: number | null;
  setPeople: (v: number | null) => void;
  hungerLevel: HungerLevel;
  setHungerLevel: (v: HungerLevel) => void;
  pizzas: number | null;
  totalSlices: number | null;
};

function Home({ people, setPeople, hungerLevel, setHungerLevel, pizzas, totalSlices }: HomeProps) {
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
              {HUNGER_CARDS.map(card => {
                const option = HUNGER_OPTIONS.find(o => o.value === card.value)!;
                return (
                  <button
                    key={card.value}
                    className={`hunger-card${hungerLevel === card.value ? ' hunger-card--active' : ''}`}
                    onClick={() => setHungerLevel(card.value)}
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
              <span className="result-label">Dere trenger</span>
              <span className="result-number">{pizzas}</span>
              <span className="result-unit">{pizzas === 1 ? 'pizza' : 'pizzaer'}</span>
              <span className="result-detail">
                ({totalSlices} stykker til {people} {people === 1 ? 'person' : 'personer'})
              </span>
            </div>
          )}
        </main>
      </div>

      <footer className="footer">Laget med 🍕 av NokPizza</footer>
    </>
  );
}

export default App;
