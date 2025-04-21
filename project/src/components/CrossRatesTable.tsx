import React from 'react';
import { Currency, CurrencyRates } from '../types/Currency';

interface CrossRatesTableProps {
  currencies: Currency[];
  rates: CurrencyRates;
}

const CrossRatesTable: React.FC<CrossRatesTableProps> = ({ currencies, rates }) => {
  const calculateCrossRate = (fromCurrency: string, toCurrency: string): number => {
    const fromRate = rates[fromCurrency]?.buy || 0;
    const toRate = rates[toCurrency]?.buy || 0;
    
    if (fromRate <= 0 || toRate <= 0) return 0;
    return toRate / fromRate;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse separate border-spacing-0 border border-gray-200 rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="p-4 text-left bg-gray-50 font-semibold text-gray-700 border-b-2 border-gray-200 text-sm">
              De / Hacia
            </th>
            {currencies.map(currency => (
              <th 
                key={currency.code}
                className="p-4 text-left bg-gray-50 font-semibold text-gray-700 border-b-2 border-gray-200 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span>{currency.flag}</span>
                  <span>{currency.code}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currencies.map(fromCurrency => (
            <tr key={fromCurrency.code} className="even:bg-gray-50">
              <td className="p-4 border-b border-gray-200 font-medium">
                <div className="flex items-center gap-2">
                  <span>{fromCurrency.flag}</span>
                  <span>{fromCurrency.code}</span>
                </div>
              </td>
              {currencies.map(toCurrency => (
                <td 
                  key={`${fromCurrency.code}-${toCurrency.code}`}
                  className="p-4 border-b border-gray-200"
                >
                  {fromCurrency.code === toCurrency.code ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    <span className="font-mono">
                      {calculateCrossRate(fromCurrency.code, toCurrency.code).toFixed(4)}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrossRatesTable;