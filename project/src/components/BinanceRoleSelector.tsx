import React from 'react';
import { BinanceRole, BinanceFees } from '../types/Currency';

interface BinanceRoleSelectorProps {
  role: BinanceRole;
  fees: BinanceFees;
  onChange: (role: BinanceRole) => void;
}

const BinanceRoleSelector: React.FC<BinanceRoleSelectorProps> = ({
  role,
  fees,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Rol en Binance P2P:
      </label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="maker"
            checked={role === 'maker'}
            onChange={() => onChange('maker')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 block text-sm text-gray-700">
            Maker ({fees.maker}%)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="taker"
            checked={role === 'taker'}
            onChange={() => onChange('taker')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-2 block text-sm text-gray-700">
            Taker ({fees.taker}%)
          </span>
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Maker: Creas una orden y esperas que alguien la tome
        <br />
        Taker: Tomas una orden existente
      </p>
    </div>
  );
};

export default BinanceRoleSelector;