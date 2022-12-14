// Libraries
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { dropdown, get } from "core/api/index.func"; // APIs
import { useGet, usePost } from "core/global/function/index.func"; // Custom react query

// Constants
import { error, input, select } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Pet = () => {
    const { type } = useParams();
    const { register, errors, control, getValues } = useContext(FormCntxt);
    const { data: category, isFetching } = useGet(['category'], get({ table: 'tbl_pet_category', type: 'dropdown', query: 'WHERE status= 1 ORDER BY name ASC' }), {});
    const { data: breed, mutate: menu, isLoading } = usePost(dropdown);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: { xs: '0 15px', sm: '0 35px' } }}>
            <Grid item xs= { 12 } sm= { 9 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Pet ID</Typography>
                    <TextField { ...register('pet.series_no') } name= "pet.series_no" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.series_no?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Name</Typography>
                    <TextField { ...register('pet.name') } name= "pet.name" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.name?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Pet Category</Typography>
                    {
                        isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                            <Box sx= { select }>
                                <Controller control= { control } name= "pet.category_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { category } disabled= { true } disableClearable
                                            getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); menu({ table: 'tbl_breed', data: { query: item.id } }); } }
                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) !== undefined ?
                                                category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) : category?.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } />
                                    ) } /> 
                            </Box> : ''
                    }
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Breed</Typography>
                    { isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                    { !isLoading ?
                        breed !== undefined ?
                            breed.length > 0 ?
                                <Controller control= { control } name= "pet.breed_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { breed } disabled= { true } disableClearable
                                            getOptionLabel= { breed => breed.name || breed.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || breed.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); } }
                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) !== undefined ?
                                                breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) : breed.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : breed[0] } />
                                    ) } />
                                : <Typography color= "text.disabled" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>You must create a breed for this category!</Typography>
                            : <Typography color= "text.disabled" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Please select a pet category first!</Typography>
                        : <Typography color= "text.disabled" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Loading...</Typography> }
                    </Box> }
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "pet.gender" defaultValue= "male"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { true }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                ) } />
                    </Box>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Age</Typography>
                    <TextField { ...register('pet.age') } name= "pet.age" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.age?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Size</Typography>
                    <TextField { ...register('pet.size') } name= "pet.size" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.size?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Color</Typography>
                    <TextField { ...register('pet.color') } name= "pet.color" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Pet;