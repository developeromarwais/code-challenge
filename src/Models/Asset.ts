import { IMarket } from './Market';

export interface IAsset {
  assetName: string;
  assetSymbol: string;
  marketCap: number;
  marketCapRank: number;
  markets?: IMarket[];
}
