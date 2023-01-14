// Libraries
import { Box, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { top } from "core/api/index.func"; // API

// Constants
import { petdesc, petfemale, petmale, subtitle, title } from "./index.style"; // Styles

const Index = () => {
    const { list, setList } = useContext(ListCntxt);
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];
    const { isFetching: fetching } = useGet({ key: ['top_pets'], fetch: top({ table: 'tbl_pets', data: { limit: 3 } }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });
    
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>Our Pets</Typography>
                    <Typography sx= { title }>Waiting for Adoption</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Container maxWidth= "lg">
                    <Grid container direction= "row" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
                        {
                            !fetching ? 
                                list.length > 0 ?
                                    list?.map((data, index) => (
                                        <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }} key= { index }>
                                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                                                <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                                                <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { JSON.parse(data.photo) } alt= "pet" width= "60%" height= "auto" /></Box>
                                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                        <Typography sx= { petdesc }>{ data.age }, { data.size }</Typography>
                                                        <Typography sx= { data.gender === 'male' ? petmale : petfemale }><FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } /></Typography>
                                                    </Stack>
                                                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ margin: '20px 0' }}>
                                                        { ((data.tags).split(', ')).map((tag, index) => ( 
                                                            <Grid item xs= { 4 } key= { index } sx= {{ padding: '5px' }}>
                                                                <Typography sx= {{ color: colors[Math.floor(Math.random() * 10)], fontWeight: 'bold', backgroundColor: `${colors[Math.floor(Math.random() * 10)]}3b`, padding: '2px 10px', borderRadius: '10px' }}># { tag.toLowerCase() }</Typography> 
                                                            </Grid>
                                                            )) }
                                                    </Grid>
                                                    <Typography component= { Link } to= "/pets" sx= {{ color: '#777d9c' }}>{ `Read more >>` }</Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    )) : <Grid item xs= { 12 }><Stack direction= "column" justifyContent= "center" alignItems= "center"><Typography>No record/s found!</Typography></Stack></Grid> :
                                <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }}>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                                        <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                                        <Box sx= {{ display: 'flex', flexDirecton: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><Skeleton variant= "rounded" sx= {{ width: '50%', height: '270px' }} /></Box>
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                <Skeleton variant= "text" sx= {{ fontSize: '2rem', width: '180px' }} />
                                                <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} />
                                            </Stack>
                                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                                <Skeleton variant= "rounded" sx= {{ width: '100px', height: '20px' }} />
                                                <Skeleton variant= "rounded" sx= {{ width: '100px', height: '20px' }} />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                        }
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
}

export default Index;