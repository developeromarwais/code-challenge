import React from 'react';
import { Helmet } from "react-helmet";
import {
    Box,
} from "@material-ui/core";
import SearchInput from '../../components/SearchInput/index';

export default (props: any): React.ReactElement => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Home • CoinMarketCap</title>
            </Helmet>

            <Box
                margin="0 auto"
                p={6}
                overflow="hidden"  >
                <SearchInput />
            </Box>
        </React.Fragment>
    );
};
