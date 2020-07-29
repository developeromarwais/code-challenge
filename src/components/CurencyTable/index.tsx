import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
    Box,
    Grid,
    CircularProgress,
    Avatar,
} from "@material-ui/core";
import { calculateWeightes } from '../../calcs/index';
import { IAsset } from '../../Models/Asset';
import { ITicker } from '../../Models/Ticker';
import { GET_ASSETS } from '../../api/GET_ASSETS';
import './style.scss';

export default (props: { searchQuery?: String }): React.ReactElement => {
    const [limit, setLimit] = useState<number>(25);

    const { loading, error, data } =
        useQuery<{ assets: IAsset[] }>(
            GET_ASSETS,
            {
                variables: {
                    limit,
                    searchQuery: `%${props.searchQuery || ''}%`,
                }
            });

    if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

    if (error) return <p>Error: {error.message} </p>;

    return (

        <Box marginTop={3}>
            <table className={"CurrencyTable"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Pair</th>
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Average Last Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data?.assets.map((asset: IAsset) => {
                            const tickers: ITicker[] | undefined = asset.markets?.map((market): ITicker => market.ticker).filter(Boolean);
                            const averageLastPrice: number = calculateWeightes(tickers || []);
                            return (
                                <tr>
                                    <td><Link style={{ margin: '10px', textDecoration: 'unset', color: 'unset' }} to={`/currency/${asset.assetSymbol}`}>{asset.assetName}</Link></td>
                                    <td>{asset.assetSymbol}/USD</td>
                                    <td>
                                        <Avatar alt={asset.assetName} src={`https://cryptoicons.org/api/icon/${asset.assetSymbol.toLowerCase()}/30`} />
                                    </td>
                                    <td>
                                        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.marketCap)}
                                    </td>
                                    <td>
                                        {
                                            tickers && tickers.length > 0 ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(averageLastPrice) : '-'
                                        }
                                    </td>
                                </tr>
                            );

                        })
                    }
                    <tr>
                        <td colSpan={5}>
                            <Paging limit={limit} setLimit={setLimit} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
};

export const Paging: React.FC<{ limit: number, setLimit: any }> = ({ limit, setLimit }) => {
    const PagingItem: React.FC<{ text: string, active?: boolean, limit?: number }> = ({ text, active, limit }) => (
        <Box
            fontSize="lg"
            style={{ cursor: 'pointer' }}
            paddingLeft="1em"
            onClick={() => limit && setLimit(limit)}  >
            {text}
        </Box>
    );

    return (
        <Box justifyContent="flex-end" paddingRight="1em">
            <Grid item xl={12}>
                <Grid container justify="flex-end" spacing={4}>
                    <Grid item>
                        <PagingItem text="View" />
                    </Grid>
                    <Grid item>
                        <PagingItem text="25" limit={25} active={limit === 25} />
                    </Grid>
                    <Grid item>
                        <PagingItem text="50" limit={50} active={limit === 50} />
                    </Grid>
                    <Grid item>
                        <PagingItem text="all" limit={99999} active={limit === 99999} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};