import React, { useState, ChangeEvent } from 'react';
import {
    Input,
    InputAdornment,
    Typography,
    Grid
} from "@material-ui/core";
import CurencyTable from '../CurencyTable/index';

export default (): React.ReactElement => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    let delayedSet: NodeJS.Timeout | null = null;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (delayedSet) clearTimeout(delayedSet);

        delayedSet = setTimeout(function () {
            setSearchQuery(value);
        }, 2000);
    }

    const SearchIcon = () => {
        return (
            <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
                <title>search / 20</title>
                <g id="search-/-20" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M18.75,17.86875 L14.03125,13.125 C16.374581,10.2976003 16.0821769,6.1277481 13.3671855,3.65505497 C10.6521942,1.18236184 6.47324054,1.27990068 3.87657061,3.87657061 C1.27990068,6.47324054 1.18236184,10.6521942 3.65505497,13.3671855 C6.1277481,16.0821769 10.2976003,16.374581 13.125,14.03125 L17.86875,18.75 L18.75,17.86875 Z M3.125,8.75 C3.125,5.64339828 5.64339828,3.125 8.75,3.125 C11.8566017,3.125 14.375,5.64339828 14.375,8.75 C14.375,11.8566017 11.8566017,14.375 8.75,14.375 C5.64339828,14.375 3.125,11.8566017 3.125,8.75 Z" id="Fill" fill="#000000"></path>
                </g>
            </svg>)
    }

    return (
        <>
            <Grid item xl={12}>
                <Grid container justify="space-evenly" spacing={10}>
                    <Grid key={0} item>
                        <Typography variant="h6" id="tableTitle" component="div">
                            Cryptocurrency Market
                        </Typography>
                    </Grid>
                    <Grid key={1} item>
                        <Input
                            style={{ width: '360px', border: '1px solid' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            placeholder="Search cryptocurrency, rates and prices" onChange={onChange} />
                    </Grid>
                </Grid>
            </Grid>



            <CurencyTable searchQuery={searchQuery} />
        </>
    );
}
