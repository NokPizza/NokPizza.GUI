import './NumberInput.css';

type Props = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
};

export function NumberInput({ label, value, onChange, min = 1 }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onChange(null);
      return;
    }
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed >= min) onChange(parsed);
  };

  return (
    <div className="number-input">
      <label>{label}</label>
      <div className="number-input__field">
        <button
          className="number-input__btn"
          onClick={() => onChange(Math.max(min, (value ?? min) - 1))}
          disabled={value === null || value <= min}
        >
          −
        </button>
        <input type="number" value={value ?? ''} min={min} placeholder="0" onChange={handleChange} />
        <button className="number-input__btn" onClick={() => onChange((value ?? 0) + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
