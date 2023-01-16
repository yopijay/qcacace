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
import { petdesc, petfemale, petmale, petseries, pettag, subtitle, title } from "./index.style"; // Styles
import Pet1 from 'assets/images/cat.png';

const Index = () => {
    const { list, setList } = useContext(ListCntxt);
    let colors = [ [ '#feca57', '#feca573b' ], [ '#ee5253', '#ee52533b' ], [ '#0abde3', '#0abde33b' ], [ '#ff9ff3', '#ff9ff33b' ], [ '#ff9f43', '#ff9f433b' ], [ '#f368e0', '#f368e03b' ], [ '#01a3a4', '#01a3a43b' ], [ '#00d2d3', '#00d2d33b' ], [ '#54a0ff', '#54a0ff3b' ], [ '#341f97', '#341f973b' ] ];
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
                <Container maxWidth= "lg" sx= {{ marginTop: '20px' }}>
                    <Grid container direction= "row" justifyContent= "center" alignItems= "flex-start" spacing= { 1 } sx= {{ height: '100%' }}>
                        {
                            !fetching ?
                                list.length > 0 ?
                                    list?.map((data, index) => (
                                        <Grid item xs= { 12 } md= { 6 } key= { index }>
                                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= {{ xs: 'flex-start' }} alignItems= {{ xs: 'flex-start' }} sx= {{ width: '100%', padding: '20px', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: '20px' }} spacing= { 2 }>
                                                <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
                                                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', width: { xs: '40%', sm: '100%' }, height: { xs: 'auto', sm: '200px' }, borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                                                        <img src= { JSON.parse(data.photo) } alt= "pet" width= "100%"  height= "auto" />
                                                    </Box>
                                                </Stack>
                                                <Stack direction= "column" justifyContent= "flex-start" alignItems= {{ xs: 'stretch' }} sx= {{ flexGrow: 1 }}>
                                                    <Typography sx= { petseries }>#{ data.series_no }</Typography>
                                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                        <Typography sx= { petdesc }>{ data.age }, { data.size }</Typography>
                                                        <Typography sx= { data.gender === 'male' ? petmale : petfemale }><FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } /></Typography>
                                                    </Stack>
                                                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                                                        { ((data.tags).split(', ')).map((tag, index) => ( <Grid item xs= { 4 } sm= { 3 } key= { index }><Typography sx= { pettag }>#{ tag.toLowerCase() }</Typography></Grid> )) }
                                                    </Grid>
                                                    {/* <Stack direction= "row" justifyContent= 'flex-start' alignItems= "flex-start" spacing= { 1 } sx= {{ width: '100%', marginTop: '10px' }}>
                                                        
                                                    </Stack> */}
                                                    <Typography gutterBottom sx= {{ marginTop: '20px' }}>Description:</Typography>
                                                    <Typography variant= "body2" color= "text.disabled" sx= {{ paddingLeft: '8px' }}>{ data.description }</Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    )) :
                                    '' :
                                ''
                        }
                    </Grid>
                </Container>
                {/* <Container maxWidth= "lg">
                    <Grid container direction= "row" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
                        {
                            !fetching ? 
                                list.length > 0 ?
                                    list?.map((data, index) => (
                                        <Grid item xs= { 12 } sm= { 8 } md= { 6 } sx= {{ padding: { xs: '10px 0', sm: '10px 20px', lg: '5px 20px'} }} key= { index }>
                                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden' }}>
                                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                                                    <Box sx= {{ width:  { xs: '100%' }, height: { xs: '100px' }, backgroundColor: '' }}>

                                                    </Box>
                                                </Stack>
                                                <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                                                <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { JSON.parse(data.photo) } alt= "pet" width= "65%" height= "250px" /></Box>
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
                </Container> */}
            </Grid>
        </Grid>
    );
}

export default Index;