import { gql } from '@apollo/client'

export const GET_MARKETS = gql`
  query GetMarkets($symbol: String) {
    markets(
      filter: {
        baseSymbol: { _eq: $symbol }
      }
    )
    {
      exchangeSymbol
      quoteSymbol
      baseSymbol
      ticker {
        percentChange
        lastPrice
        lowPrice
        highPrice
        baseVolume
      }
    }
  }
`;
