// Libraries
import { Autocomplete, Box, Grid, Stack, TextareaAutosize, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { input as theme } from "core/global/theme/index.style"; // Theme

// Constants
import { error, input, select, textarea } from "../index.style"; // Styles
import { Controller } from "react-hook-form";
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Applicant = () => {
    const { type } = useParams();
    const { register, errors, control, getValues } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: { xs: '0 15px', sm: '0 35px' } }}>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Given name</Typography>
                    <ThemeProvider theme= { theme }><TextField { ...register('applicant.fname') } name= "applicant.fname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /></ThemeProvider>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.fname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Middle name</Typography>
                    <ThemeProvider theme= { theme }><TextField { ...register('applicant.mname') } name= "applicant.mname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /></ThemeProvider>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.mname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Surname</Typography>
                    <ThemeProvider theme= { theme }><TextField { ...register('applicant.lname') } name= "applicant.lname" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /></ThemeProvider>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.lname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Gender</Typography>
                    <ThemeProvider theme= { theme }>
                        <Box sx= { select }>
                            <Controller control= { control } name= "applicant.gender" defaultValue= "male"
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type === 'view' }
                                            noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                            onChange= { (e, item) => { onChange(item.id); } }
                                            value= { gender.find(data => { return data.id === (getValues().gender !== undefined ? getValues().gender : value) }) } />
                                    ) } />
                        </Box>
                    </ThemeProvider>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Contact no</Typography>
                    <ThemeProvider theme= { theme }><TextField { ...register('applicant.contact_no') } name= "applicant.contact_no" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /></ThemeProvider>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.contact_no?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Email</Typography>
                    <TextField { ...register('applicant.email') } name= "applicant.email" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.email?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">Address</Typography>
                    <ThemeProvider theme= { theme }><TextareaAutosize name= "applicant.address" { ...register('applicant.address') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } /></ThemeProvider>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Applicant;