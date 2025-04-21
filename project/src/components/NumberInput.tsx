import React from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  step?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  step = 'any',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Allow empty input
    if (val === '') {
      onChange(0);
      return;
    }

    // Convert to number and update if valid
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      onChange(numVal);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm">
        {label}
      </label>
      <input
        type="number"
        id={id}
        value={value || ''} // Show empty string when value is 0
        onChange={handleChange}
        placeholder={placeholder}
        step={step}
        className="w-full p-3.5 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
      />
    </div>
  );
};

export default NumberInput;