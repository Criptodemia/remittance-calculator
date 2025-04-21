import React from 'react';

interface ResultsDisplayProps {
  isVisible: boolean;
  usdtAmount: number;
  amountBeforeCommission: number;
  commissionRate: number;
  commissionAmount: number;
  finalAmount: number;
  profitInUsdt: number;
  p2pFees: {
    entry: number;
    exit: number;
    total: number;
  };
  targetCurrency: string;
  targetFlag: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isVisible,
  usdtAmount,
  amountBeforeCommission,
  commissionRate,
  commissionAmount,
  finalAmount,
  profitInUsdt,
  p2pFees,
  targetCurrency,
  targetFlag,
}) => {
  if (!isVisible) return null;

  return (
    <div className="mt-8 p-7 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
      <h2 className="text-xl font-semibold text-blue-900 pb-3 mb-4 border-b border-blue-200">
        Desglose de la Operación
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-white/50 rounded-lg">
          <p className="text-blue-800 font-medium mb-2">
            1. Conversión a USDT:{' '}
            <span className="font-semibold">{usdtAmount.toFixed(2)}</span> USDT
          </p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-800 font-medium mb-2">
            2. Costos P2P:
          </p>
          <ul className="space-y-1 text-amber-700">
            <li>• Entrada: <span className="font-semibold">{p2pFees.entry.toFixed(4)}</span> USDT</li>
            <li>• Salida: <span className="font-semibold">{p2pFees.exit.toFixed(4)}</span> USDT</li>
            <li className="pt-1 border-t border-amber-200">
              • Total P2P: <span className="font-semibold">{p2pFees.total.toFixed(4)}</span> USDT
            </li>
          </ul>
        </div>

        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-emerald-800 font-medium mb-2">
            3. Tu Ganancia ({commissionRate}%):
          </p>
          <p className="text-emerald-700 font-semibold text-lg">
            {profitInUsdt.toFixed(4)} USDT
          </p>
        </div>
        
        <div className="p-4 bg-white/50 rounded-lg">
          <p className="text-blue-800 font-medium mb-2">
            4. Monto Final para el Receptor:
          </p>
          <p className="text-2xl font-bold text-blue-900">
            {finalAmount.toFixed(2)} {targetFlag} {targetCurrency}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            (Después de costos P2P y comisión)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;