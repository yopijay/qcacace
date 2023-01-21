// Libraries
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { input, select } from "../../index.style";
import { Controller } from "react-hook-form";
import { useGet } from "core/global/function/index.func";
import { dropdown } from "core/api/index.func";

// Constants
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Other = () => {
    const { getValues, control, errors, register } = useContext(FormCntxt);
    const { data: tags, isFetching: tagfetching } = useGet({ key: ['tag_dropdown'], fetch: dropdown({ table: 'tbl_pet_tags', data: {} }) });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } md= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Age</Typography>
                    <TextField { ...register('age') } name= "age" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.age?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "gender" defaultValue= "male"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id } 
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                ) } />
                    </Box>
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Size</Typography>
                    <TextField { ...register('size') } name= "size" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.size?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Color</Typography>
                    <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Tags</Typography>
                    { tagfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : tags?.length > 0 ?
                        <Box sx= { select }>
                            <Controller control= { control } name= "tags" defaultValue= { [] }
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { tags } multiple disableClearable
                                        getOptionLabel= { tags => tags.name || tags.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                        isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        onChange= { (e, item) => { onChange(item); } }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                        value= { getValues().tags !== undefined ? (getValues().tags).length > 0 ? getValues().tags : [] : [] }
                                        />
                                ) } /> 
                        </Box> : '' }
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.pet_tags?.message }</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Other;