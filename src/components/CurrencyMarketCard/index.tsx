import React from 'react';
import {
    Box,
    Grid
} from "@material-ui/core";
import { IMarket } from '../../Models/Market';



export default ({ market }: { market: IMarket }): React.ReactElement => {
    return (
        <Grid style={{ border: '1px solid', margin: '5px', padding: '7px', borderRadius: '8px', backgroundColor: '#969595' }}>
            <h3>{market.exchangeSymbol}</h3>
            <Grid container spacing={4}>
                <Grid item>
                    <h3 style={{ fontSize: '32px', color: '#0f4c80' }}>
                        {market.baseSymbol}/{market.quoteSymbol}
                    </h3>
                    <Box style={{ fontSize: '16px' }}>Pair</Box>
                </Grid>
                <Grid item>
                    <h3 style={{ fontSize: '32px', color: '#0f4c80' }}>
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
                    <Box style={{ fontSize: '16px' }}>Price</Box>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.lastPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        color={''}
                        lowerText="Last Price" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseFloat(market.ticker.percentChange).toFixed(2)}` : '-'}
                        color={market.ticker ? parseFloat(market.ticker.percentChange) > 0 ? 'green' : 'red' : ''}
                        lowerText="24h Change" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.lowPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        color={''}
                        lowerText="24h Low" />
                </Grid>
                <Grid item>
                    <BottomCardText
                        upperText={market.ticker ? `${parseInt(market.ticker.highPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        color={''}
                        lowerText="24h High" />
                </Grid>
            </Grid>
        </Grid >
    );
};

const BottomCardText: React.FC<{ upperText: string, lowerText: string, color: string }> = ({ upperText, lowerText, color }: { upperText: string, lowerText: string, color: string }) => (
    <Box>
        <h4 style={{ color: color !== '' ? color : undefined }}>
            {upperText}
        </h4>
        <Box>{lowerText}</Box>
    </Box>
)
