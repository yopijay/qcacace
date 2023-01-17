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
                    <Grid container direction= "row" justifyContent= "center" alignItems= "flex-start" spacing= { 1 }>
                        {
                            !fetching ?
                                list.length > 0 ?
                                    list?.map((data, index) => (
                                        <Grid item xs= { 12 } md= { 6 } key= { index }>
                                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "flex-start" sx= {{ width: '100%', padding: '20px', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: '20px' }} spacing= { 2 }>
                                                <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
                                                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', width: { xs: '40%', sm: '100%' }, height: { xs: 'auto', sm: '200px' }, borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                                                        <img src= { JSON.parse(data.photo) } alt= "pet" width= "100%"  height= "auto" />
                                                    </Box>
                                                </Stack>
                                                <Stack direction= "column" justifyContent= "flex-start" alignItems= {{ xs: 'stretch' }} sx= {{ flexGrow: 1 }}>
                                                    <Typography sx= { petseries }>#{ data.series_no }</Typography>
                                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                        <Typography variant sx= {{ whiteSapce: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.age }, { data.size }</Typography>
                                                        <Typography sx= { data.gender === 'male' ? petmale : petfemale }><FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } /></Typography>
                                                    </Stack>
                                                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                                                        { ((data.tags).split(', ')).map((tag, index) => ( <Grid item xs= { 4 } sm= { 3 } md= { 4 } key= { index }><Typography sx= { pettag }>#{ tag.toLowerCase() }</Typography></Grid> )) }
                                                    </Grid>
                                                    <Typography gutterBottom sx= {{ marginTop: '20px' }}>Description:</Typography>
                                                    <Typography variant= "body2" color= "text.disabled" sx= {{ paddingLeft: '8px' }}>{ data.description }</Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    )) :
                                <Grid item xs= { 12 }><Typography sx= {{ width: '100%', textAlign: 'center' }}>No record/s found.</Typography></Grid> :
                            <Grid item xs= { 12 } md= { 6 }>
                                <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "flex-start" sx= {{ width: '100%', padding: '20px', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: '20px' }} spacing= { 2 }>
                                    <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
                                        <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} />
                                    </Stack>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, width: '100%' }}>
                                        <Skeleton variant= "text" sx= {{ fontSize: '1.4rem', width: { xs: '30%' } }} />
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                            <Skeleton variant= "text" sx= {{ fontSize: '2rem', width: '50%' }} />
                                            <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} />
                                        </Stack>
                                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                                            <Grid item xs= { 4 } sm= { 3 }><Skeleton variant= "text" sx= { pettag } /></Grid>
                                        </Grid>
                                        <Skeleton variant= "text" sx= {{ fontSize: '1.2rem', width: '25%' }} />
                                        <Skeleton variant= "rounded" sx= {{ width: '100%', height: '50px' }} />
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