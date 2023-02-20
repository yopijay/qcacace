// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Container, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { look, records } from "core/api/index.func"; // API

// Constants
import { item, petdesc, petfemale, petmale, search } from "../index.style"; // Styles

const MissingPets = () => {
    const { list, setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: data => setList(data) });
    const { isFetching: fetching } =
        useGet({ key: ['missing_pet_list'], fetch: records({ table: 'tbl_missing_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: data => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ overflow: 'hidden', height: '100%' }}>
            <Container maxWidth= "lg" sx= {{ overflowY: 'scroll', height: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Missing Pets</Typography>
                    <Typography>Our Pet Is One Of Our Family Members And Being Away From Them Is An Awful Feeling. We At QC Animal Care And Adoption Center Are 
                        Willing To Help The Pet Owners To Find Their Fur Baby. Let's All Help The Pet To Find Their Way Back To Their Home.</Typography>
                </Stack>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ marginTop: '20px' }}>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                        <form autoComplete= "off">
                            <Box sx= { search }>
                                <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                                <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0' }}
                                    onChange= { e => { find({ table: 'tbl_missing_pets', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value } }); } } />
                            </Box>
                        </form>
                    </Stack>
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '0 0 40px 0' }}>
                        { !fetching && !finding ? list?.length > 0 ? 
                            list?.map((data, index) => (
                                <Grid item xs= { 12 } md= { 6 } key= { index } sx= {{ padding: '10px 8px' }}>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { item } spacing= { 1 }>
                                        <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                                            sx= {{ backgroundColor: '#EFEFEF', width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
                                            <Avatar src= { JSON.parse(data.photo) } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                                        </Stack>
                                        <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                                            <Typography sx= { petdesc }>{ `${data.stage}` }</Typography>
                                            <Typography sx= { data.gender === 'male' ? petmale : petfemale }>
                                                <FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } />
                                            </Typography>
                                        </Stack>
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                            <Typography variant= "body2"><b>Category:</b> { data.category }</Typography>
                                            <Typography variant= "body2"><b>Breed:</b> { data.breed }</Typography>
                                            <Typography variant= "body2"><b>Color:</b> { data.color }</Typography>
                                        </Stack>
                                        <Typography variant= "body2"><b>Email us at:</b> qcacac2017@gmail.com</Typography>
                                    </Stack>
                                </Grid>
                            )) : 
                                <Grid item xs= { 12 }>
                                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= { item }><Typography>No missing pet/s available.</Typography></Stack>
                                </Grid> :
                            <Grid item xs= { 12 } sm= { 4 } md= { 3 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { item } spacing= { 1 }>
                                    <Skeleton variant= "rounded" sx= {{ width: '100%' , height: '200px' }} />
                                    <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                                        <Skeleton variant= "text" sx= {{ fontSize: '1rem', width: '60%' }} />
                                        <Skeleton variant= "rounded" sx= {{ width: '15px', height: '15px' }} />
                                    </Stack>
                                    <Skeleton variant= "text" sx= {{ fontSize: '.7rem', width: '50%' }} />
                                    <Skeleton variant= "text" sx= {{ fontSize: '.9rem', width: '50%' }} />
                                </Stack>
                            </Grid> }
                    </Grid>
                </Stack>
            </Container>
        </Stack>
    );
}

export default MissingPets;