import './SelectInput.css';

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function SelectInput<T extends string>({ label, value, options, onChange }: Props<T>) {
  return (
    <div className="select-input">
      <label>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value as T)}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
