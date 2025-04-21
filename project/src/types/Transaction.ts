export interface Transaction {
  id: string;
  date: Date;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  usdtAmount: number;
  commission: number;
  p2pFees: {
    entry: number;
    exit: number;
    total: number;
  };
  profit: number;
  provider: 'binance' | 'dorado';
  role: 'maker' | 'taker';
}

export interface TransactionPeriod {
  startDate: Date;
  endDate: Date;
  totalProfit: number;
  totalFees: number;
  totalCommissions: number;
  transactionCount: number;
}