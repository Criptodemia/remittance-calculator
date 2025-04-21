import React from 'react';
import { Currency, CurrencyRates } from '../types/Currency';

interface RatesTableProps {
  currencies: Currency[];
  rates: CurrencyRates;
  onRateChange: (currency: string, type: 'buy' | 'sell', value: number) => void;
}

const RatesTable: React.FC<RatesTableProps> = ({ currencies, rates, onRateChange }) => {
  const handleRateChange = (currency: string, type: 'buy' | 'sell', value: string) => {
    // Allow empty input
    if (value === '') {
      onRateChange(currency, type, 0);
      return;
    }

    // Convert to number and update if valid
    const numVal = parseFloat(value);
    if (!isNaN(numVal)) {
      onRateChange(currency, type, numVal);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mb-6 border-collapse separate border-spacing-0 border border-gray-200 rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="p-4 text-left bg-gray-50 font-semibold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 text-sm">
              Moneda
            </th>
            <th className="p-4 text-left bg-gray-50 font-semibold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 text-sm">
              Tasa Compra (Moneda / USDT)
            </th>
            <th className="p-4 text-left bg-gray-50 font-semibold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 text-sm">
              Tasa Venta (Moneda / USDT)
            </th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => {
            const rate = rates[currency.code] || { buy: 0, sell: 0 };
            return (
              <tr 
                key={currency.code}
                className="even:bg-gray-50"
              >
                <td className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <span className="font-medium text-gray-900">{currency.code}</span>
                  </div>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <input
                    type="number"
                    value={rate.buy || ''} // Show empty string when value is 0
                    onChange={(e) => handleRateChange(currency.code, 'buy', e.target.value)}
                    step="any"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-4 border-b border-gray-200">
                  <input
                    type="number"
                    value={rate.sell || ''} // Show empty string when value is 0
                    onChange={(e) => handleRateChange(currency.code, 'sell', e.target.value)}
                    step="any"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RatesTable;