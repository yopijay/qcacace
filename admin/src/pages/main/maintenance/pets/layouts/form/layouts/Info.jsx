// Libraries
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

// Core
import { dropdown } from "core/api/index.func"; // API
import { randomizer, useGet, usePost } from "core/global/function/index.func"; // Function
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { error, input, select } from "../index.style";

const Info = ({ fetching }) => {
    const { type } = useParams();
    const { getValues, control, errors, register, setValue } = useContext(FormCntxt);
    const { data: category, isFetching: categoryfetching } = useGet({ key: ['ctg_dropdown'], fetch: dropdown({ table: 'tbl_pet_category', data: {} }) });
    const { data: breed, mutate: setbreeds, isLoading: breedloading } = usePost({ fetch: dropdown });


    useEffect(() => { if(!fetching) { if(type !== 'new') { setbreeds({ table: 'tbl_breed', data: { id: getValues().pet_category_id } }); } } }, [fetching, type, setbreeds, getValues]);
    useEffect(() => { if(type === 'new') { setValue('series_no', randomizer(7)); } }, [type, setValue]);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
        <Grid item xs= { 12 } sm= { 8 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography gutterBottom color= "text.secondary" variant= "body2">Series No.</Typography>
                { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                    <TextField { ...register('series_no') } name= "series_no" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
            </Stack>
        </Grid>
        <Grid item xs= { 12 } sm= { 6 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography gutterBottom color= "text.secondary">*Pet Category</Typography>
                { categoryfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                    <Box sx= { select }>
                        <Controller control= { control } name= "pet_category_id" defaultValue= { 0 }
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { category } disableClearable disabled= { type === 'view' }
                                    getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                    isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    onChange= { (e, item) => { onChange(item.id); setbreeds({ table: 'tbl_breed', data: { id: item.id } }); } }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                    value= { category?.find(data => { return data.id === (getValues().pet_category_id !== undefined ? getValues().pet_category_id : value) }) !== undefined ?
                                                    category?.find(data => { return data.id === (getValues().pet_category_id !== undefined ? getValues().pet_category_id : value) }) : 
                                                    category?.length === 0 ? { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } /> ) } /> 
                    </Box> : '' }
                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.pet_category_id?.message }</Typography>
            </Stack>
        </Grid>
        <Grid item xs= { 12 } sm= { 6 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography gutterBottom color= "text.secondary">*Breed</Typography>
                { breedloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                { !breedloading ?
                    breed !== undefined ?
                        breed.length > 0 ?
                            <Controller control= { control } name= "breed_id" defaultValue= { 0 }
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { breed } disabled= { type === 'view' } disableClearable
                                        getOptionLabel= { breed => breed.name || breed.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                        isOptionEqualToValue= { (option, value) => option.name === value.name || breed.id === value.id }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                        value= { breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) !== undefined ?
                                            breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) : breed.length === 0 ?
                                            { id: 0, name: '-- SELECT AN ITEM BELOW --' } : breed[0] } />
                                ) } />
                            : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a breed for this category!</Typography>
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                    : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
                </Box> }
                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
            </Stack>
        </Grid>
        </Grid>
    );
}

export default Info;