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

    if (error) return <p>Something went wrong. This was the response: {error.message} </p>;

    return (

        <Box marginTop={3}>
            <table style={{ borderSpacing: 0, border: `1px solid rgb(226, 232, 240)`, margin: '0 auto', width: '900px', boxShadow: '0px 3px 16px -7px rgba(51, 51, 51, 0.3)' }}>
                <thead style={{ backgroundColor: 'rgb(226, 232, 240)', color: 'black' }}>
                    <tr>
                        <th>Name</th>
                        <th>Pair</th>
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Average Last Price</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.assets.map((asset: IAsset) =>
                        <ValueRow
                            key={asset.assetName + asset.assetSymbol}
                            {...asset}
                        />)
                    }
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <LimitSelector limit={limit} setLimit={setLimit} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </Box>
    );
};

export const ValueRow: React.FC<IAsset> = ({ assetName, assetSymbol, marketCap, markets }) => {
    const tickers: ITicker[] | undefined = markets?.map((market): ITicker => market.ticker).filter(Boolean);
    const averageLastPrice: number = calculateWeightes(tickers || []);

    return (
        <tr>
            <td><Link style={{ margin: '10px' }} to={`/currency/${assetSymbol}`}>{assetName}</Link></td>
            <td>{assetSymbol}/USD</td>
            <td>
                <Avatar alt={assetName} src={`https://cryptoicons.org/api/icon/${assetSymbol.toLowerCase()}/30`} />
            </td>
            <td>
                {Intl.NumberFormat(
                    'en-US',
                    {
                        style: 'currency',
                        currency: 'USD'
                    }).format(marketCap)
                }
            </td>
            <td>
                {
                    tickers && tickers.length > 0
                        ? Intl.NumberFormat(
                            'en-US',
                            {
                                style: 'currency',
                                currency: 'USD'
                            }).format(averageLastPrice)
                        : '-'
                }
            </td>
        </tr>
    );
};

export const LimitSelector: React.FC<{ limit: number, setLimit: any }> = ({ limit, setLimit }) => {
    const LimitSelectorTextItem: React.FC<{ text: string, active?: boolean, limit?: number }> = ({ text, active, limit }) => (
        <Box
            fontSize="lg"
            style={{ cursor: 'pointer' }}
            paddingLeft="1em"
            onClick={() => limit && setLimit(limit)}
        >
            {text}
        </Box>
    );

    return (
        <Box justifyContent="flex-end" paddingRight="1em">
            <Grid item xl={12}>
                <Grid container justify="flex-end" spacing={4}>
                    <Grid item>
                        <LimitSelectorTextItem text="View" />
                    </Grid>
                    <Grid item>
                        <LimitSelectorTextItem text="25" limit={25} active={limit === 25} />
                    </Grid>
                    <Grid item>
                        <LimitSelectorTextItem text="50" limit={50} active={limit === 50} />
                    </Grid>
                    <Grid item>
                        <LimitSelectorTextItem text="all" limit={99999} active={limit === 99999} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};