import React from 'react';
import { useQuery } from '@apollo/client';
import {
    Box,
    CircularProgress,
    Grid,
} from "@material-ui/core";
import { IMarket } from '../../Models/Market';
import { GET_MARKETS } from '../../api/GET_MARKETS';
import CurrencyMarketCard from '../CurrencyMarketCard/index';

export default ({ symbol }: { symbol: string }): React.ReactElement => {
    const { loading, error, data } = useQuery<{ markets: IMarket[] }>(GET_MARKETS, { variables: { symbol } });

    if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

    if (error) return <p>Something went wrong. This was the response: {error.message} </p>;

    const exchanges = data?.markets
        .map((market: IMarket): string => market.exchangeSymbol)
        .filter((elem, pos, arr) => arr.indexOf(elem) === pos);

    return (
        <>
            {
                exchanges?.map(exchange => (
                    <>
                        <h3>{exchange}</h3>
                        <Grid container lg={12}>
                            {
                                data?.markets
                                    .filter((m: IMarket) => m.exchangeSymbol === exchange)
                                    .map((market: IMarket) =>
                                        <Grid item lg={6}>
                                            <CurrencyMarketCard
                                                key={market.exchangeSymbol + Math.random()}
                                                market={market}
                                            />
                                        </Grid>)
                            }
                        </Grid>
                    </>
                ))
            }
        </>
    );
};
