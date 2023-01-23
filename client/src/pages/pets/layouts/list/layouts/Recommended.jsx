// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Core
import { recommend } from "core/api/index.func"; // API
import { useGet } from "core/global/function/index.func"; // Function

// Constants
import { btnadopt, petcontainer, petdesc, petfemale, petimage, petmale, petseries, pettag } from "../index.style"; // Styles

const Recommended = () => {
    const { data: recommended, isLoading: recommendloading } = 
        useGet({ key: ['pet_rcmmnd'], fetch: recommend(JSON.parse(localStorage.getItem('recommend'))), options: { refetchOnWindowFocus: false } });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: '20px 20px 50px 20px' }}>
            { !recommendloading ? 
                recommended?.length > 0 ?
                    recommended?.map((data, index) => (
                        <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index }>
                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "start" sx= { petcontainer } spacing= { 2 }>
                                <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%' } }}>
                                    <Box sx= { petimage }><img src= { JSON.parse(data.photo) } alt= "pet" width= "100%"  height= "auto" /></Box>
                                </Stack>
                                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ width: { xs: '100%', sm: '60%' } }} spacing= { 2 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                                        <Typography sx= { petseries }>#{ data.series_no }</Typography>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                            <Typography sx= { petdesc }>{ `${data.age}, ${data.size}` }</Typography>
                                            <Typography sx= { data.gender === 'male' ? petmale : petfemale }>
                                                <FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } />
                                            </Typography>
                                        </Stack>
                                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ width: '100%', marginTop: '5px' }}>
                                            { (JSON.parse(data.tags)).map((tag, index) => (
                                                <Grid item xs= { 4 } sm= { 3 } md= { 4 } key= { index }>
                                                    <Typography sx= { pettag }>#{(tag.name).toLowerCase()}</Typography>
                                                </Grid> )) }
                                        </Grid>
                                        <Typography gutterBottom sx= {{ marginTop: '20px' }}>Description:</Typography>
                                        <Typography variant= "body2" color= "text.disabled" sx= {{ paddingLeft: '8px' }}>{ data.description }</Typography>
                                    </Stack>
                                    <Typography sx= { btnadopt } component= { Link } to= { `/pets/adopt/${btoa(data.id)}/verification` }>Adopt</Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    )) 
                :
                <Grid item xs= { 12 } md= { 6 } lg= { 4 }>
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= { petcontainer }>
                        <Typography sx= {{ width: '100%', textAlign: 'center' }}>No record/s found!</Typography>
                    </Stack>
                </Grid>: 
                <Grid item xs= { 12 } md= { 6 } lg= { 4 }>
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
                </Grid> }
        </Grid>
    );
}

export default Recommended;