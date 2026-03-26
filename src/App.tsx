import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/Layout/Header';
import { NumberInput } from './components/Inputs/NumberInput';
import { SelectInput } from './components/Inputs/SelectInput';
import { calculatePizzasNeeded } from './utils/pizza/pizzaCalculator';
import { HUNGER_OPTIONS } from './utils/pizza/pizza.constants';
import type { HungerLevel } from './types/pizza.type';

function App() {
  const [people, setPeople] = useState<number | null>(null);
  const [hungerLevel, setHungerLevel] = useState<HungerLevel>('normal');
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.className = colorTheme;
    localStorage.setItem('theme', colorTheme);
  }, [colorTheme]);

  const pizzas = people !== null ? calculatePizzasNeeded(people, hungerLevel) : null;

  return (
    <>
      <Header theme={colorTheme} onToggleTheme={() => setColorTheme(colorTheme === 'light' ? 'dark' : 'light')} />

      <div className="app">
        <main className="content">
          <NumberInput label="Antall personer" value={people} onChange={setPeople} />
          <SelectInput label="Hvor sulten?" value={hungerLevel} options={HUNGER_OPTIONS} onChange={setHungerLevel} />

          {pizzas !== null && (
            <div className="result">
              <span className="result-label">Du trenger</span>
              <span className="result-number">{pizzas}</span>
              <span className="result-emoji">🍕</span>
              <span className="result-unit">{pizzas === 1 ? 'pizza' : 'pizzaer'}</span>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
