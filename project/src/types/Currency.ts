export interface Currency {
  code: string;
  flag: string;
}

export interface Rate {
  buy: number;
  sell: number;
}

export interface CurrencyRates {
  [key: string]: Rate;
}

export type P2PProvider = 'binance' | 'dorado';
export type BinanceRole = 'maker' | 'taker';

export interface P2PFees {
  binance: {
    maker: number;
    takerFixed: number;
  };
  dorado: {
    maker: number;
    takerRanges: {
      min: number;
      max: number;
      fee: number;
      isPercentage: boolean;
    }[];
  };
}