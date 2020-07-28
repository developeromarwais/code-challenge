import React from 'react';
import {
    Box,
    Grid
} from "@material-ui/core";
import { IMarket } from '../../Models/Market';

export default ({ market }: { market: IMarket }): React.ReactElement => {
    return (
        <Grid lg={6} style={{ border: '1px solid', margin: '5px', padding: '7px', borderRadius: '12px' }}>
            <h3>{market.exchangeSymbol}</h3>
            <Grid container spacing={4}>
                <Grid item>
                    <h3>
                        {market.baseSymbol}/{market.quoteSymbol}
                    </h3>
                    <Box>Pair</Box>
                </Grid>
                <Grid item>
                    <h3>
                        {market.ticker
                            ? Intl.NumberFormat(
                                'en-US',
                                {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(parseFloat(market.ticker.lastPrice))
                            : "-"
                        }
                    </h3>
                    <Box>Price</Box>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.lastPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        lowerText="Last Price" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseFloat(market.ticker.percentChange).toFixed(2)}` : '-'}
                        lowerText="24h Change" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.lowPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        lowerText="24h Low" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.highPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        lowerText="24h High" />
                </Grid>
            </Grid>
        </Grid >
    );
};

const BottomCardText: React.FC<{ upperText: string, lowerText: string }> = ({ upperText, lowerText }: { upperText: string, lowerText: string }) => (
    <Box>
        <h4>
            {upperText}
        </h4>
        <Box>{lowerText}</Box>
    </Box>
)
