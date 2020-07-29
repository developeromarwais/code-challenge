import React from 'react';
import { Helmet } from "react-helmet";
import { RouteComponentProps } from 'react-router-dom';
import {
    Box,
} from "@material-ui/core";
import CuurencyMarket from '../../components/CuurencyMarket/index';

export default ({ match }: RouteComponentProps<{ name: string }>): React.ReactElement => {
    const symbol: string = match.params.name;
    return (
        <React.Fragment>
            <Helmet>
                (<title>{`${symbol} Markets`}</title>)
            </Helmet>

            <Box margin="0 auto" p={6} overflow="hidden">
                <h3>{symbol} Markets</h3>
                <CuurencyMarket symbol={symbol} />
            </Box>
        </React.Fragment>
    );
};
