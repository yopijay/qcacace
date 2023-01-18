// Libraries
import { Box, Container, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Functions
import { look, records } from "core/api/index.func"; // API

// Constants
import { btnicon, btntxt, pettag, search } from "./index.style";
import Recommended from "./layouts/Recommended";
import Items from "./layouts/Items";

const Index = () => {
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];
    const { setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });
    const { isFetching: fetching } = useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Container maxWidth= "lg">
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
                </Container>
            </Grid>
            <Grid item>
                <Container maxWidth= "lg" sx= {{ marginTop: '20px' }}>
                    { !fetching && !finding ? <Items /> : '' }
                </Container>
            </Grid>
        </Grid>
        // <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
        //     <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
        //         <Recommended />
        //         <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
        //             <form autoComplete= "off">
        //                 <Box sx= { search }>
        //                     <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
        //                     <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search...." sx= {{ padding: '5px 0 0 0' }} />
        //                 </Box>
        //             </form>
        //         </Stack>
        //     </Stack>
        //     { !fetching && !finding ? <Items /> : 
        //         <Grid container direction= "row" justifyContent= "center" alignItems= "flex-start">
        //             <Grid item xs= { 12 } md= { 6 }>
        //                 <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "flex-start" sx= {{ width: '100%', padding: '20px', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: '20px' }} spacing= { 2 }>
        //                     <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
        //                         <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} />
        //                     </Stack>
        //                     <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, width: '100%' }}>
        //                         <Skeleton variant= "text" sx= {{ fontSize: '1.4rem', width: { xs: '30%' } }} />
        //                         <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
        //                             <Skeleton variant= "text" sx= {{ fontSize: '2rem', width: '50%' }} />
        //                             <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} />
        //                         </Stack>
        //                         <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
        //                             <Grid item xs= { 4 } sm= { 3 }><Skeleton variant= "text" sx= { pettag } /></Grid>
        //                         </Grid>
        //                         <Skeleton variant= "text" sx= {{ fontSize: '1.2rem', width: '25%' }} />
        //                         <Skeleton variant= "rounded" sx= {{ width: '100%', height: '50px' }} />
        //                     </Stack>
        //                 </Stack>
        //             </Grid>
        //         </Grid> }
        // </Stack>
    );
}

export default Index;