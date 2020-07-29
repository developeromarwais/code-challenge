import { ITicker } from '../Models/Ticker';

export const calculateWeightes = (tickers: ITicker[]): number => {
  const prices: number[] = tickers.filter(t => t).map((ticker: ITicker) => parseFloat(ticker.lastPrice));
  const volumes: number[] = tickers.filter(t => t).map((ticker: ITicker) => parseFloat(ticker.baseVolume));

  const volumesAsWeights = getVolumeWeight(volumes);

  return avgLastPrice(prices, volumesAsWeights);
};

export const getVolumeWeight = (volumes: number[]): number[] => {
  if (volumes.length === 0) return [];

  const total = volumes.reduce((total, value) => total + value);

  return volumes.map((value: number) => value / total);
};

export const avgLastPrice = (prices: number[], weights: number[]): number => {
  const result = prices.map((value, i) => {
    const weight = weights[i]
    const acc = value * weight
    return [acc, weight]
  }).reduce((total, value) => [total[0] + value[0], total[1] + value[1]], [0, 0])

  return result[0] / result[1]
};
