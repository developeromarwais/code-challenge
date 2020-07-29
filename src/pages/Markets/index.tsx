import React from 'react';
import { Helmet } from "react-helmet";
import { RouteComponentProps, Link } from 'react-router-dom';
import {
    Box,
} from "@material-ui/core";
import SymbolMarkets from '../../components/CuurencyMarket/index';

export default ({ match }: RouteComponentProps<{ name: string }>): React.ReactElement => {
    const symbol: string = match.params.name;
    debugger
    return (
        <React.Fragment>
            <Helmet>
                (<title>{`${symbol} Markets • CoinMarketCap`}</title>)
            </Helmet>

            <Box margin="0 auto" p={6} overflow="hidden">
                <Link to="/">{'<'} back to All Markets</Link>
                <h3>{symbol} Markets</h3>

                <SymbolMarkets symbol={symbol} />
            </Box>
        </React.Fragment>
    );
};
