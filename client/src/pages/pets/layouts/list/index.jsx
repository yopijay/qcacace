// Libraries
import { Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Functions
import { look, records } from "core/api/index.func"; // API

// Constants
import { btnrecommend, search } from "./index.style";
import Recommended from "./layouts/Recommended";

// Layouts
import Items from "./layouts/Items"; // Items

const Index = ({ setDialog }) => {
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
                            <Typography variant= "h6" sx= { btnrecommend } onClick= { () => setDialog(true) }><FontAwesomeIcon icon= { solid('sliders') } /></Typography>
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
    );
}

export default Index;