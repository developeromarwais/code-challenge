import { ITicker } from '../Models/Ticker';

export const calculateWeightes = (tickers: ITicker[]): number => {
  const prices: number[] = tickers.filter(t => t).map((ticker: ITicker) => parseFloat(ticker.lastPrice));
  const volumes: number[] = tickers.filter(t => t).map((ticker: ITicker) => parseFloat(ticker.baseVolume));

  const volumesAsWeights = getWeightFromNumbers(volumes);

  return weightedMean(prices, volumesAsWeights);
};

export const getWeightFromNumbers = (arrValues: number[]): number[] => {
  if (arrValues.length === 0) return [];

  const total = arrValues.reduce((a, b) => a + b);

  return arrValues.map((value: number) => value/total);
};

export const weightedMean = (arrValues: number[], arrWeights: number[]): number => {
  const result = arrValues
    .map((value, i) => {
      const weight = arrWeights[i]
      const sum = value * weight
      return [sum, weight]
    })
    .reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0])

  return result[0] / result[1]
};
