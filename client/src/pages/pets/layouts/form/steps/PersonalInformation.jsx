// Libraries
import { Autocomplete, Box, Grid, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { btntxt, input, select, textarea } from "../index.style"; // Styles
import { Controller } from "react-hook-form";
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const PersonalInformation = () => {
    const { register, errors, getValues, control } = useContext(FormCntxt);

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
            <Grid item><Typography variant= "h5">Personal Information</Typography></Grid>
            <Grid item>
                <form autoComplete= "off">
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography>*First name</Typography>
                                <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography>Middle name</Typography>
                                <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.mname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography>*Last name</Typography>
                                <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 7 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography>*Contact no.</Typography>
                                <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 5 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom color= "text.secondary" variant= "body2">*Gender</Typography>
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
                        <Grid item xs= { 12 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom color= "text.secondary" variant= "body2">Address</Typography>
                                <TextareaAutosize name= "address" { ...register('address') } minRows= { 4 } maxRows= { 4 } style= { textarea } />
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 }>
                            <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                                <Grid item xs= { 12 } md= { 5 } lg= { 3 }>
                                    <Box sx= { btntxt }>Next</Box>
                                    {/* { !loading ? 
                                        <Box sx= { btntxt } onClick= { handleSubmit((data) => rgstr(data) )}>Verify</Box> : 
                                        <Box sx= { btntxt }>Verifying</Box>} */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default PersonalInformation;