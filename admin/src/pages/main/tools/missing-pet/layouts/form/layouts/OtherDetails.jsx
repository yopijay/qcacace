// Libraries
import { Autocomplete, Box, Grid, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, input, select, textarea } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const OtherDetails = ({ fetching }) => {
    const { type } = useParams();
    const { control, getValues, errors, register } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= 'flex-start' alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "gender" defaultValue= "male"
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type === 'view' }
                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                    onChange= { (e, item) => { onChange(item.id); } }
                                    value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 7 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Color</Typography>
                    { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /> }
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 7 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom owner_contact_no= "text.secondary" variant= "body2">*Owner Contact No.</Typography>
                    { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('owner_contact_no') } name= "owner_contact_no" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /> }
                </Stack>
                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.owner_contact_no?.message }</Typography>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">Description</Typography>
                    <TextareaAutosize name= "description" { ...register('description') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default OtherDetails;