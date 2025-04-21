import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, History } from 'lucide-react';
import CurrencySelector from './components/CurrencySelector';
import NumberInput from './components/NumberInput';
import RatesTable from './components/RatesTable';
import ResultsDisplay from './components/ResultsDisplay';
import CrossRatesTable from './components/CrossRatesTable';
import P2PProviderSelector from './components/P2PProviderSelector';
import TransactionHistory from './components/TransactionHistory';
import { CURRENCIES, INITIAL_RATES, P2P_FEES, getFlagByCurrencyCode, calculateRemittance } from './utils/currencyData';
import { CurrencyRates, P2PProvider, BinanceRole } from './types/Currency';
import { Transaction } from './types/Transaction';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');
  const [amount, setAmount] = useState<number>(100);
  const [commission, setCommission] = useState<number>(2);
  const [sourceCurrency, setSourceCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('VES');
  const [rates, setRates] = useState<CurrencyRates>(INITIAL_RATES);
  const [p2pProvider, setP2PProvider] = useState<P2PProvider>('binance');
  const [binanceRole, setBinanceRole] = useState<BinanceRole>('taker');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    const savedRates = localStorage.getItem('remittanceRates');
    const savedTransactions = localStorage.getItem('remittanceTransactions');
    
    if (savedRates) {
      try {
        setRates(JSON.parse(savedRates));
      } catch (e) {
        console.error('Error loading saved rates:', e);
      }
    }
    
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        setTransactions(parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        })));
      } catch (e) {
        console.error('Error loading saved transactions:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('remittanceRates', JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem('remittanceTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleRateChange = (currency: string, type: 'buy' | 'sell', value: number) => {
    setRates(prev => ({
      ...prev,
      [currency]: {
        ...prev[currency],
        [type]: value
      }
    }));
  };

  const results = calculateRemittance(
    amount,
    commission,
    sourceCurrency,
    targetCurrency,
    rates,
    p2pProvider,
    binanceRole
  );

  const saveTransaction = () => {
    if (!results.isValid) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date: new Date(),
      sourceCurrency,
      targetCurrency,
      sourceAmount: amount,
      targetAmount: results.finalAmount,
      usdtAmount: results.usdtAmount,
      commission,
      p2pFees: results.p2pFees,
      profit: results.profitInUsdt,
      provider: p2pProvider,
      role: binanceRole
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Globe size={40} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Panel de Cálculo de Remesas
          </h1>
          <p className="text-gray-500">Aplicación de Escritorio</p>
        </header>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calculadora
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <History size={20} />
              <span>Historial</span>
            </div>
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <>
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b border-gray-200 flex items-center gap-2">
                <span>Tabla de Tasas de Cambio</span>
                <span className="text-sm font-normal text-gray-500">(vs USDT)</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Edita las tasas de compra y venta aquí. Las tasas representan el precio en moneda local por 1 USDT.
              </p>
              
              <RatesTable 
                currencies={CURRENCIES} 
                rates={rates} 
                onRateChange={handleRateChange} 
              />
            </div>

            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b border-gray-200">
                Calcular Nuevo Envío
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CurrencySelector 
                  id="sourceCurrency"
                  label="Moneda de Origen:"
                  currencies={CURRENCIES}
                  value={sourceCurrency}
                  onChange={setSourceCurrency}
                />
                
                <div className="flex items-center">
                  <div className="flex-1">
                    <CurrencySelector 
                      id="targetCurrency"
                      label="Moneda de Destino:"
                      currencies={CURRENCIES}
                      value={targetCurrency}
                      onChange={setTargetCurrency}
                    />
                  </div>
                  <div className="hidden md:flex justify-center px-4 mt-6">
                    <ArrowRight size={24} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <NumberInput 
                  id="amount"
                  label="Monto a Enviar:"
                  value={amount}
                  onChange={setAmount}
                  placeholder="100"
                />
                
                <NumberInput 
                  id="commission"
                  label="Comisión (%):"
                  value={commission}
                  onChange={setCommission}
                  placeholder="2"
                />
              </div>

              <P2PProviderSelector
                provider={p2pProvider}
                role={binanceRole}
                fees={P2P_FEES}
                onProviderChange={setP2PProvider}
                onRoleChange={setBinanceRole}
              />
            </div>

            <ResultsDisplay 
              isVisible={results.isValid}
              usdtAmount={results.usdtAmount}
              amountBeforeCommission={results.amountBBeforeCommission}
              commissionRate={commission}
              commissionAmount={results.commissionAmount}
              finalAmount={results.finalAmount}
              profitInUsdt={results.profitInUsdt}
              p2pFees={results.p2pFees}
              targetCurrency={targetCurrency}
              targetFlag={getFlagByCurrencyCode(targetCurrency)}
            />

            {results.isValid && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={saveTransaction}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Guardar Transacción
                </button>
              </div>
            )}

            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 pb-3 mb-4 border-b border-gray-200">
                Tabla de Tasas Cruzadas
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Esta tabla muestra las tasas de cambio directas entre todas las monedas disponibles.
              </p>
              
              <CrossRatesTable 
                currencies={CURRENCIES} 
                rates={rates}
              />
            </div>
          </>
        ) : (
          <TransactionHistory transactions={transactions} />
        )}
      </div>
      
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Remittance Calculator © 2025</p>
      </footer>
    </div>
  );
}

export default App;