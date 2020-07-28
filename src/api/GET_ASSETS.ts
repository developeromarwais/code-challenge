import { gql } from '@apollo/client'

export const GET_ASSETS = gql`
  query GetMarkets($limit: Int, $searchQuery: String)  {
    assets(
      filter: {
        assetName: { _like: $searchQuery }
      },
      sort: [{marketCapRank: ASC}],
      page: {limit: $limit}
    )
    {
      assetName
      assetSymbol
      marketCap
      marketCapRank
      markets (
        filter: {
          _or: [
            {marketSymbol: { _like: "%/USD" }}
            {marketSymbol: { _like: "%/USDT" }}
          ]
        }
      ) {
        ticker {
          lastPrice
          baseVolume
        }
      }
    }
  }
`;
