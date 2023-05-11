// libraries
import { useContext } from "react";
import { Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/List"; // Context
import { look, records } from "core/api/index.func"; // APIs
import { useGet, usePost } from "core/global/function/index.func"; // Custom react query

// Constants
import { btnicon, btntxt, search } from "./index.style"; // Styles

// Layouts
import Item from "./layouts/Item";
import Dashboard from "./layouts/Dashboard";

const Index = () => {
    const { setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });
    const { isFetching: fetching } = useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Pets</Typography>
                <Dashboard />
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                    <form autoComplete= "off">
                        <Box sx= { search }>
                            <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                            <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0' }}
                                onChange= { e => { find({ table: 'tbl_pets', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value } }); } } />
                        </Box>
                    </form>
                    <Box>
                        <Typography component= { Link } to= "/maintenance/pet/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } style= {{ color: '#FFFFFF' }} /></Typography>
                        <Typography component= { Link } to= "/maintenance/pet/form/new" sx= { btntxt }>New Pet</Typography>
                    </Box>
                </Stack>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                { !fetching && !finding ? <Item /> :
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                        <Grid item xs= { 12 } sm= { 6 } md= { 4 } sx= {{ padding: '10px 8px' }}>
                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '120px' }} />
                        </Grid> 
                    </Grid> }
            </Stack>
        </Stack>
    );
}

export default Index;