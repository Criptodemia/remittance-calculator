import React from 'react';
import { Currency } from '../types/Currency';

interface CurrencySelectorProps {
  id: string;
  label: string;
  currencies: Currency[];
  value: string;
  onChange: (value: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  id,
  label,
  currencies,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3.5 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all bg-white text-gray-800"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.flag} {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;