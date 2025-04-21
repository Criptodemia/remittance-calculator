import { Currency, CurrencyRates, BinanceRole, P2PProvider, P2PFees } from '../types/Currency';

export const CURRENCIES: Currency[] = [
  { code: 'PEN', flag: '🇵🇪' },
  { code: 'CLP', flag: '🇨🇱' },
  { code: 'COP', flag: '🇨🇴' },
  { code: 'USD', flag: '🇺🇸' },
  { code: 'VES', flag: '🇻🇪' },
  { code: 'BRL', flag: '🇧🇷' }
];

export const P2P_FEES: P2PFees = {
  binance: {
    maker: 0.20, // 0.20% por operación
    takerFixed: 0.05, // 0.05 USDT por operación
  },
  dorado: {
    maker: 0.25, // 0.25%
    takerRanges: [
      { min: 1, max: 39.99, fee: 0.49, isPercentage: false },
      { min: 40, max: 99.99, fee: 1.23, isPercentage: true },
      { min: 100, max: 999.99, fee: 0.99, isPercentage: true },
      { min: 1000, max: 9999.99, fee: 0.39, isPercentage: true },
      { min: 10000, max: Infinity, fee: 0.24, isPercentage: true }
    ]
  }
};

export const INITIAL_RATES: CurrencyRates = {
  PEN: { buy: 3.80, sell: 3.80 },
  CLP: { buy: 950.00, sell: 950.00 },
  COP: { buy: 4000.00, sell: 4000.00 },
  USD: { buy: 1.005, sell: 1.005 },
  VES: { buy: 37.00, sell: 37.00 },
  BRL: { buy: 5.20, sell: 5.20 }
};

export const getFlagByCurrencyCode = (code: string): string => {
  const currency = CURRENCIES.find(c => c.code === code);
  return currency ? currency.flag : '🏳️';
};

const calculateDoradoTakerFee = (amount: number): number => {
  const range = P2P_FEES.dorado.takerRanges.find(
    r => amount >= r.min && amount <= r.max
  );

  if (!range) return 0;

  return range.isPercentage 
    ? amount * (range.fee / 100)
    : range.fee;
};

export const calculateRemittance = (
  sourceAmount: number,
  commissionPercentage: number,
  sourceCurrency: string,
  targetCurrency: string,
  rates: CurrencyRates,
  provider: P2PProvider,
  binanceRole: BinanceRole = 'taker'
) => {
  const buyRateSource = rates[sourceCurrency]?.buy || 0;
  const sellRateTarget = rates[targetCurrency]?.sell || 0;

  if (buyRateSource <= 0 || sellRateTarget <= 0 || sourceAmount <= 0) {
    return {
      isValid: false,
      usdtAmount: 0,
      amountBBeforeCommission: 0,
      commissionAmount: 0,
      finalAmount: 0,
      profitInUsdt: 0,
      p2pFees: { entry: 0, exit: 0, total: 0 }
    };
  }

  // 1. Convertir el monto de origen a USDT
  const usdtAmount = sourceAmount / buyRateSource;

  // 2. Calcular comisiones P2P
  let entryFee = 0;
  let exitFee = 0;

  if (provider === 'binance') {
    if (binanceRole === 'maker') {
      entryFee = usdtAmount * (P2P_FEES.binance.maker / 100);
      exitFee = usdtAmount * (P2P_FEES.binance.maker / 100);
    } else {
      entryFee = P2P_FEES.binance.takerFixed;
      exitFee = P2P_FEES.binance.takerFixed;
    }
  } else {
    if (binanceRole === 'maker') {
      entryFee = usdtAmount * (P2P_FEES.dorado.maker / 100);
      exitFee = usdtAmount * (P2P_FEES.dorado.maker / 100);
    } else {
      entryFee = calculateDoradoTakerFee(usdtAmount);
      exitFee = calculateDoradoTakerFee(usdtAmount);
    }
  }

  const totalP2PFees = entryFee + exitFee;

  // 3. Calcular la comisión sobre el monto en USDT
  const commissionInUsdt = usdtAmount * (commissionPercentage / 100);

  // 4. Calcular el monto final en la moneda destino
  const usdtAfterFeesAndCommission = usdtAmount - totalP2PFees - commissionInUsdt;
  const finalAmount = usdtAfterFeesAndCommission * sellRateTarget;

  // 5. Calcular el monto antes de comisión en moneda destino
  const amountBBeforeCommission = (usdtAmount - totalP2PFees) * sellRateTarget;

  // 6. Calcular la comisión en moneda destino
  const commissionAmount = commissionInUsdt * sellRateTarget;

  return {
    isValid: true,
    usdtAmount,
    amountBBeforeCommission,
    commissionAmount,
    finalAmount,
    profitInUsdt: commissionInUsdt,
    p2pFees: {
      entry: entryFee,
      exit: exitFee,
      total: totalP2PFees
    }
  };
};