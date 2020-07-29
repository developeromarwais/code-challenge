import React from 'react';
import {
    Box,
    Grid
} from "@material-ui/core";
import { IMarket } from '../../Models/Market';
import './style.scss';

export default ({ market }: { market: IMarket }): React.ReactElement => {
    return (
        <Grid style={{ border: '1px solid', margin: '5px', padding: '7px', borderRadius: '8px' }} >
            <h3>{market.exchangeSymbol}</h3>
            <Grid className="infoGrid" container spacing={4}>
                <Grid item>
                    <h3 style={{ fontSize: '32px', color: '#0f4c80', margin: 0 }}>
                        {market.baseSymbol}/{market.quoteSymbol}
                    </h3>
                    <Box style={{ fontSize: '16px' }}>Pair</Box>
                </Grid>
                <Grid item>
                    <h3 style={{ fontSize: '32px', color: '#0f4c80', margin: 0 }}>
                        {market.ticker ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(market.ticker.lastPrice)) : "-"
                        }
                    </h3>
                    <Box style={{ fontSize: '16px' }}>Price</Box>
                </Grid>
            </Grid>
            <hr />
            <Grid className="infoGrid" container spacing={4}>
                <Grid item>
                    <Box>
                        <h4>
                            {market.ticker ? `${parseInt(market.ticker.lastPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        </h4>
                       Last Price
                    </Box>

                </Grid>
                <Grid item>
                    <Box>
                        <h4 style={{ color: market.ticker ? parseFloat(market.ticker.percentChange) > 0 ? 'green' : 'red' : undefined }}>
                            {market.ticker ? `${parseFloat(market.ticker.percentChange).toFixed(2)}` : '-'}
                        </h4>
                      24h Change
                    </Box>
                </Grid>
                <Grid item>
                    <Box>
                        <h4>
                            {market.ticker ? `${parseInt(market.ticker.lowPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        </h4>
                         24h Low
                    </Box>
                </Grid>
                <Grid item>
                    <Box>
                        <h4>
                            {market.ticker ? `${parseInt(market.ticker.highPrice).toLocaleString()}.${market.quoteSymbol}` : '-'}
                        </h4>
                        24h High
                    </Box>
                </Grid>
            </Grid>
        </ Grid >
    );
};

