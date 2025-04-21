import React, { useState } from 'react';
import { Transaction, TransactionPeriod } from '../types/Transaction';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [periodFilter, setPeriodFilter] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const calculatePeriodStats = (transactions: Transaction[]): TransactionPeriod => {
    const now = new Date();
    const startDate = new Date();
    startDate.setMonth(now.getMonth() - 1);

    return {
      startDate,
      endDate: now,
      totalProfit: transactions.reduce((sum, t) => sum + t.profit, 0),
      totalFees: transactions.reduce((sum, t) => sum + t.p2pFees.total, 0),
      totalCommissions: transactions.reduce((sum, t) => sum + (t.commission * t.usdtAmount / 100), 0),
      transactionCount: transactions.length
    };
  };

  const stats = calculatePeriodStats(transactions);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Ganancia Total</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {stats.totalProfit.toFixed(2)} USDT
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Después de fees P2P
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Fees P2P</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {stats.totalFees.toFixed(2)} USDT
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total gastado en fees
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Transacciones</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.transactionCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            En este período
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Historial de Transacciones
            </h3>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="day">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="year">Este Año</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  De → A
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto USDT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fees P2P
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ganancia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(transaction.date, 'dd MMM yyyy HH:mm', { locale: es })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.sourceCurrency} → {transaction.targetCurrency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.usdtAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.provider === 'binance' ? 'Binance' : 'Dorado'} ({transaction.role})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">
                    {transaction.p2pFees.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    +{transaction.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;