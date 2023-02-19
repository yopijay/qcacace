// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
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
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Missing Pets</Typography>
                <Typography>Our Pet Is One Of Our Family Members And Being Away From Them Is An Awful Feeling. We At QC Animal Care And Adoption Center Are 
                    Willing To Help The Pet Owners To Find Their Fur Baby. Let's All Help The Pet To Find Their Way Back To Their Home.</Typography>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <form autoComplete= "off">
                        <Box sx= { search }>
                            <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                            <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0' }}
                                onChange= { e => { find({ table: 'tbl_missing_pets', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value } }); } } />
                        </Box>
                    </form>
                </Stack>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: '0 0 40px 0' }}>
                    { !fetching && !finding ? list?.length > 0 ? 
                        list?.map((data, index) => (
                            <Grid item xs= { 6 } sm= { 4 } md= { 3 } key= { index }>
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
                            <Grid item xs= { 6 } sm= { 4 } md= { 3 }>
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
                {/* <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '0 0 40px 0' }}>
                    { !fetching && !finding ? list?.length > 0 ?
                        list?.map((data, index) => (
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" key= { index } spacing= { 1 } sx= { item }>
                                <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                                    <Typography variant= "body2" sx= {{ fontWeight: 'bold', color: '#444444' }}>{ data.date }</Typography>
                                </Stack>
                                { data.photo !== null ?
                                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
                                        <Avatar src= { JSON.parse(data.photo) } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                                    </Stack> : '' }
                                <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bolder', color: '#444444' }}>{ data.title }</Typography>
                                <Typography sx= {{ fontFamily: 'Tommy Bold', color: '#444444' }}>{ data.subtitle }</Typography>
                                <Typography sx= {{ fontFamily: 'Gilroy Light', color: '#555555' }}>{ data.description }</Typography>
                            </Stack>
                        )) :
                        <Stack direction= "row" justifyContent= "center" alignItems= "center"><Typography>No missing pet/s available!</Typography></Stack> :
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { item }>
                            <Stack direction= "row" justifyContent= "flex-end" alignItems= "center"><Skeleton variant= "text" sx= {{ fontSize: '1rem', width: '20%' }} /></Stack>
                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '250px', margin: '10px 0 20px 0' }} />
                            <Skeleton variant= "text" sx= {{ fontSize: '1.5rem', width: '20%' }} />
                            <Skeleton variant= "text" sx= {{ fontSize: '1.2rem', width: '15%' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '100px', marginTop: '10px' }} />
                        </Stack> }
                </Stack> */}
            </Stack>
        </Stack>
    );
}

export default MissingPets;