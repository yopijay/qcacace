// Libraries
import { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context

// Constants
import { btnadopt, petcontainer, petdesc, petfemale, petimage, petmale, petseries, pettag } from "../index.style"; // Styles
import { Link } from "react-router-dom";

const Items = () => {
    const { list } = useContext(ListCntxt);

    return (
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: '20px' }}>
                { list.length > 0 ?
                    list?.map((data, index) => (
                        <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index }>
                            <Stack direction= {{ xs: 'column', sm: 'row' }} justifyContent= "flex-start" alignItems= "flex-start" sx= { petcontainer } spacing= { 2 }>
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
                                    <Typography sx= { btnadopt } component= { Link } to= { `/pets/${btoa(data.id)}/adopt` }>Adopt</Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    )) : 
                    [0, 1, 2].map(index => (
                        <Grid item xs= { 12 } md= { 6 } lg= { 4 } key= { index }>
                            <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= { petcontainer }>
                                <Typography sx= {{ width: '100%', textAlign: 'center' }}>No record/s found!</Typography>
                            </Stack>
                        </Grid>
                    )) }
            </Grid>
    );
}

export default Items;