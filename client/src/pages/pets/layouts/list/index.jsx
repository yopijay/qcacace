// Libraries
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Functions
import { look, records } from "core/api/index.func"; // API

// Constants
import { btnicon, btntxt, search } from "./index.style";
import Recommended from "./layouts/Recommended";
import Items from "./layouts/Items";

const Index = () => {
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];
    const { setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });
    const { isFetching: fetching } = useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Recommended />
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                    <form autoComplete= "off">
                        <Box sx= { search }>
                            <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                            <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search...." sx= {{ padding: '5px 0 0 0' }} />
                        </Box>
                    </form>
                    <Box>
                        <Typography component= { Link } to= "/pets/recommendation/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('comments') } style= {{ color: '#FFFFFF' }} /></Typography>
                        <Typography component= { Link } to= "/pets/recommendation/form/new" sx= { btntxt }>View Recommendation</Typography>
                    </Box>
                </Stack>
            </Stack>
            { !fetching && !finding ? <Items /> : 
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                    {
                        [0, 1, 2, 3].map(index => (
                            <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px' } }} key= { index }>
                                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>

                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid> }
        </Stack>
    );
}

export default Index;