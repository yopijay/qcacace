// Libraries
import { Autocomplete, Box, Grid, InputAdornment, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/Form"; // Context

// Constants
import { input, select, textarea } from "../../../index.style";
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Info = ({ fetching }) => {
    const { register, errors, getValues, control } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*First name</Typography>
                        <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>Middle name</Typography>
                        <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.mname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*Last name</Typography>
                        <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 7 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*Contact no.</Typography>
                        <TextField { ...register('contact_no') } name= "contact_no" variant= "standard"
                            InputProps= {{ disableUnderline: true, startAdornment: <InputAdornment position="start">+63</InputAdornment>, }}
                            inputProps= {{ maxLength: 10 }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.contact_no?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } sm= { 5 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', fontSize:'15px', color:'black'}}>Gender</Typography>
                        { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                            <Box sx= { select }>
                                <Controller control= { control } name= "gender" defaultValue= "male"
                                        render= { ({ field: { onChange, value } }) => (
                                            <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                                noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                                renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                                onChange= { (e, item) => { onChange(item.id); } }
                                                value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                        ) } />
                            </Box> }
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.gender?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{ fontWeight:'600', fontSize:'15px', color:'black'}}>Address</Typography>
                        <TextareaAutosize name= "address" { ...register('address') } minRows= { 4 } maxRows= { 4 } style= { textarea } />
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Info;