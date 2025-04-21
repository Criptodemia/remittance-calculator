import React from 'react';
import { P2PProvider, BinanceRole, P2PFees } from '../types/Currency';

interface P2PProviderSelectorProps {
  provider: P2PProvider;
  role: BinanceRole;
  fees: P2PFees;
  onProviderChange: (provider: P2PProvider) => void;
  onRoleChange: (role: BinanceRole) => void;
}

const P2PProviderSelector: React.FC<P2PProviderSelectorProps> = ({
  provider,
  role,
  fees,
  onProviderChange,
  onRoleChange,
}) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Proveedor P2P:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="binance"
              checked={provider === 'binance'}
              onChange={() => onProviderChange('binance')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Binance P2P
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="dorado"
              checked={provider === 'dorado'}
              onChange={() => onProviderChange('dorado')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Dorado
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rol en {provider === 'binance' ? 'Binance' : 'Dorado'} P2P:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="maker"
              checked={role === 'maker'}
              onChange={() => onRoleChange('maker')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Maker ({provider === 'binance' ? `${fees.binance.maker}%` : `${fees.dorado.maker}%`})
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="taker"
              checked={role === 'taker'}
              onChange={() => onRoleChange('taker')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Taker
            </span>
          </label>
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200">
        <p className="font-medium mb-2">Comisiones {provider === 'binance' ? 'Binance' : 'Dorado'} P2P:</p>
        {provider === 'binance' ? (
          <p>
            {role === 'maker' ? (
              `${fees.binance.maker}% sobre el monto total de cada orden`
            ) : (
              `Comisión fija de ${fees.binance.takerFixed} USDT por operación (${fees.binance.takerFixed * 2} USDT en total por entrada y salida)`
            )}
          </p>
        ) : (
          <div>
            {role === 'maker' ? (
              <p>{fees.dorado.maker}% sobre el monto total de cada orden</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {fees.dorado.takerRanges.map((range, index) => (
                  <li key={index}>
                    {range.min} - {range.max === Infinity ? '∞' : range.max} USDT:{' '}
                    {range.isPercentage ? `${range.fee}%` : `${range.fee} USDT`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default P2PProviderSelector;