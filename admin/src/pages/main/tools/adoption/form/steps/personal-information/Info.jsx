// Libraries
import { Autocomplete, Box, Grid, InputAdornment, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/Form"; // Context

// Constants
import { input, select, textarea } from "../../../index.style";
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender
const barangays = [
    { id: '', name: '-- SELECT BARANGAY --' }, 
    { id: 'alicia', name: 'ALICIA' }, 
    { id: 'amihan', name: 'AMIHAN' }, 
    { id: 'bagong_silangan', name: 'BAGONG SILANGAN' }, 
    { id: 'bahay_toro', name: 'BAHAY TORO' }, 
    { id: 'batasa_hills', name: 'BATASAN HILLS' }, 
    { id: 'commonwealth', name: 'COMMONWEALTH' }, 
    { id: 'fairview', name: 'FAIRVIEW' }, 
    { id: 'holy_spirit', name: 'HOLY SPIRIT' }, 
    { id: 'loyola_heights', name: 'LOYOLA HEIGHTS' }, 
    { id: 'matandang_balara', name: 'MATANDANG BALARA' }, 
    { id: 'novaliches_proper', name: 'NOVALICHES PROPER' }, 
    { id: 'pasong_tamo', name: 'PASONG TAMO' }, 
    { id: 'san_bartolome', name: 'SAN BARTOLOME' }, 
    { id: 'up_campus', name: 'U.P. CAMPUS' }, 
    { id: 'white_plains', name: 'WHITE PLAINS' }
];

const Info = ({ fetching }) => {
    const { register, errors, getValues, control, setValue, setError } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*First name</Typography>
                        <TextField { ...register('fname') } name= "fname" variant= "standard" 
                            onChange= { e => { setValue('fname', (e.target.value).replace(/[^a-zA-Z -]/g, '')); setError('fname', { message: '' }); } } 
                            InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>Middle name</Typography>
                        <TextField { ...register('mname') } name= "mname" variant= "standard"
                            onChange= { e => setValue('mname', (e.target.value).replace(/[^a-zA-Z -]/g, '')) } 
                            InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.mname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 4 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*Last name</Typography>
                        <TextField { ...register('lname') } name= "lname" variant= "standard"
                            onChange= { e => { setValue('lname', (e.target.value).replace(/[^a-zA-Z -]/g, '')); setError('lname', { message: '' }); } } 
                            InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } md= { 7 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*Contact no.</Typography>
                        <TextField { ...register('contact_no') } name= "contact_no" variant= "standard" 
                            onChange= { e => { setValue('contact_no', (e.target.value).replace(/[^\d-]/g, '')); setError('contact_no', { message: '' }); } }
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
                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                            <Grid item xs= { 12 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>Street</Typography>
                                    <TextField { ...register('street') } name= "street" fullWidth variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.street?.message }</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs= { 6 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>Barangay</Typography>
                                    <Box sx= { select }>
                                        <Controller control= { control } name= "barangay"
                                            render= { ({ field: { onChange, value } }) => (
                                                <Autocomplete options= { barangays } disableClearable getOptionLabel= { brgy => brgy.name || brgy.id }
                                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                                    renderInput= { params => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                                    getOptionDisabled= { option => option.id === '' } onChange= { (e, item) => { onChange(item.id); } }
                                                    value= { barangays.find(data => { return data.id === (getValues()?.barangay !== undefined ? getValues()?.barangay : '') }) } />
                                            ) } />
                                    </Box>
                                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.barangay?.message }</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs= { 6 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>City</Typography>
                                    <TextField { ...register('city') } name= "city" fullWidth variant= "standard" value= "Quezon City" disabled InputProps= {{ disableUnderline: true }} sx= { input } />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Info;