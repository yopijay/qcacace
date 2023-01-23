// Libraries
import { useParams } from "react-router-dom";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { specific } from "core/api/index.func"; // API
import { useGet } from "core/global/function/index.func"; // Function

// Constants
import { petdesc, petfemale, petimage, petmale, petseries, pettag } from "./index.style"; // Styles

const PetInfo = () => {
    const { id } = useParams();
    const { data: pet, isFething: fetching,} = useGet({ key: ['pet_specific'], fetch: specific({ table: 'tbl_pets', id: atob(id) }) });
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
            <Stack direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start' }} alignItems= "center" sx= {{ width: '100%' }}>
                { pet !== undefined && !fetching ? <Box sx= { petimage }><img src= { JSON.parse(pet[0].photo) } alt= "pet" width= "100%" height= "auto" /></Box> : 
                    <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px', borderRadius: '20px' }} /> }
            </Stack>
            <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ width: '100%' }} spacing= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= 'stretch' sx= {{ width: '100%' }}>
                    { pet !== undefined && !fetching ? <Typography sx= { petseries }>#{ pet[0].series_no }</Typography> : ''  }
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        { pet !== undefined && !fetching ? <Typography sx= { petdesc }>{ `${pet[0].age}, ${pet[0].size}` }</Typography> : '' }
                        { pet !== undefined && !fetching ? 
                            <Typography sx= { pet[0].gender === 'male' ? petmale : petfemale }>
                                    <FontAwesomeIcon icon= { pet[0].gender === 'male' ? solid('mars') : solid('venus') } />
                                </Typography> : '' }
                    </Stack>
                    { pet !== undefined && !fetching ? 
                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ width: '100%', marginTop: '5px' }}>
                            { (JSON.parse(pet[0].tags)).map((tag, index) => (
                                <Grid item xs= { 4 } sm= { 6 } md= { 4 } key= { index }>
                                    <Typography sx= { pettag }>#{(tag.name).toLowerCase()}</Typography>
                                </Grid> )) }
                        </Grid> : '' }
                    { pet !== undefined && !fetching ? <Typography gutterBottom sx= {{ marginTop: '20px' }}>Description:</Typography> : '' }
                    { pet !== undefined && !fetching ? <Typography variant= "body2" color= "text.disabled" sx= {{ paddingLeft: '8px' }}>{ pet[0].description }</Typography> : '' }
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PetInfo;