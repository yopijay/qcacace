// Libraries
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Constants
import { petdesc, petfemale, petimage, petmale, petseries, pettag } from "./index.styles";

const PetInfo = ({ data }) => {

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
            <Stack direction= "row" justifyContent= {{ xs: 'center', md: 'flex-start' }} alignItems= "center" sx= {{ width: { xs: '100%', sm: '40%', md: '100%' } }}>
                { data !== undefined ? <Box sx= { petimage }><img src= { JSON.parse(data[0].photo) } alt= "pet" width= "100%" height= "auto" /></Box> : 
                    <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} /> }
            </Stack>
            <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ width: { xs: '100%', sm: '60%', md: '100%' } }} spacing= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= 'stretch' sx= {{ width: '100%' }}>
                    { data !== undefined ? <Typography sx= { petseries }>#{ data[0].series_no }</Typography> :
                        <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} />  }
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        { data !== undefined ? <Typography sx= { petdesc }>{ data[0].stage }</Typography> :
                            <Skeleton variant= "text" sx= {{ fontSize: '1.6rem', width: '50%' }} /> }
                        { data !== undefined ? 
                            <Typography sx= { data[0].gender === 'male' ? petmale : petfemale }>
                                    <FontAwesomeIcon icon= { data[0].gender === 'male' ? solid('mars') : solid('venus') } />
                                </Typography> : <Skeleton variant= "rounded" sx= {{ width: '20px', height: '20px' }} /> }
                    </Stack>
                    { data !== undefined ? 
                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ width: '100%', marginTop: '5px' }}>
                            { (JSON.parse(data[0].tags)).map((tag, index) => (
                                <Grid item xs= { 4 } sm= { 6 } md= { 4 } key= { index }>
                                    <Typography sx= { pettag }>#{(tag.name).toLowerCase()}</Typography>
                                </Grid> )) }
                        </Grid> : 
                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ marginTop: '5px' }}>
                            <Grid item xs= { 4 } sm= { 3 } md= { 4 }><Skeleton variant= "text" sx= {{ fontSize: '1rem' }} /></Grid>
                        </Grid> }
                </Stack>
            </Stack>
        </Stack>
    );
}

export default PetInfo;