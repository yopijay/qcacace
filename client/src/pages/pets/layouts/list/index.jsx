// Libraries
import { Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Functions
import { records } from "core/api/index.func"; // API

// Constants
import { btnrecommend, petcontainer } from "./index.style";
import Recommended from "./layouts/Recommended";

// Layouts
import Items from "./layouts/Items"; // Items

const Index = ({ setDialog }) => {
    const { setList } = useContext(ListCntxt);
    const { isFetching: fetching } = useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Container maxWidth= "lg">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                            <Typography variant= "h6" sx= { btnrecommend } onClick= { () => setDialog(true) }><FontAwesomeIcon icon= { solid('sliders') } /></Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Grid>
            <Grid item>
                <Container maxWidth= "lg" sx= {{ marginTop: '20px' }}>
                    { localStorage.getItem('recommend') !== null ? <Recommended /> : '' }
                    { !fetching ? <Items /> : 
                        <Grid container direction= "row" justifyContent= "center" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: '20px' }}>
                            { [0, 1, 2].map(index => (
                                <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index }>
                                    <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "start" sx= { petcontainer } spacing= { 2 }>
                                        <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%', md: '50%' } }}>
                                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} />
                                        </Stack>
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                                            <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} />
                                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} />
                                                <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} />
                                            </Stack>
                                            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                                                <Grid item xs= { 4 } sm= { 3 } md= { 4 }><Skeleton variant= "text" sx= {{ fontSize: '1rem' }} /></Grid>
                                            </Grid>
                                            <Skeleton variant= "text" sx= {{ fontSize: '1.2rem', width: '25%' }} />
                                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '50px' }} />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            )) }
                        </Grid> }
                </Container>
            </Grid>
        </Grid>
    );
}

export default Index;