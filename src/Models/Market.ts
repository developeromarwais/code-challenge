import { ITicker } from './Ticker';

export interface IMarket {
  exchangeSymbol: string,
  quoteSymbol: string,
  baseSymbol: string,
  ticker: ITicker;
}
