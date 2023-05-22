//  Libraries
import { Autocomplete, Box, Grid, InputAdornment, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Core
import { FormCntxt } from "core/context/Form"; // Context

// Constants
import { date, input, select, textarea } from "../index.style"; // Styles
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

const OwnerInformation = () => { 
    const { register, errors, control, getValues } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*First name</Typography>
                    <TextField { ...register('fname') } name= "fname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.fname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>Middle name</Typography>
                    <TextField { ...register('mname') } name= "mname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.mname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 4 }>
                <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Last name</Typography>
                    <TextField { ...register('lname') } name= "lname" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.lname?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Contact no.</Typography>
                    <TextField { ...register('contact_no') } name= "contact_no" variant= "standard"
                        InputProps= {{ disableUnderline: true, startAdornment: <InputAdornment position="start">+63</InputAdornment>, }}
                        inputProps= {{ maxLength: 10 }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.contact_no?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= 'body2' gutterBottom sx={{ fontWeight:'600', color:'black'}}>*Gender</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "owner_gender" defaultValue= "male"
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { gender } disableClearable getOptionLabel= { opt => opt.name || opt.id }
                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                    onChange= { (e, item) => { onChange(item.id); } } disabled= { true }
                                    value= { gender.find(data => { return data.id === (getValues().owner_gender !== undefined ? getValues().owner_gender : value) }) } />
                            ) } />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx={{fontWeight:'600'}} gutterBottom variant= "body2">*Birthdate</Typography>
                    <Box sx= { date }>
                        <Controller control= { control } name= "birthdate" defaultValue= { `${dayjs(new Date()).year()}-${dayjs(new Date()).month() + 1}-${dayjs(new Date()).date()}` }
                            render= { ({ field: { onChange, value } }) => (
                                <LocalizationProvider dateAdapter= { AdapterDayjs }>
                                    <DatePicker value= { value } renderInput= { (params) => <TextField { ...params } variant= "standard" size= "small" fullWidth /> } disabled= { true }
                                        onChange= { e => { onChange(`${dayjs(e).year()}-${dayjs(e).month() + 1}-${dayjs(e).date()}`); } } />
                                </LocalizationProvider> ) }>
                        </Controller>
                    </Box>
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.birthdate?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>Street</Typography>
                    <TextField { ...register('street') } name= "street" fullWidth variant= "standard"  InputProps= {{ disableUnderline: true }} sx= { input } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.street?.message }</Typography>
                </Stack> 
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>Barangay</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "barangay"
                            render= { ({ field: { onChange, value } }) => (
                                <Autocomplete options= { barangays } disableClearable getOptionLabel= { brgy => brgy.name || brgy.id } disabled= { true }
                                    noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                    renderInput= { params => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                    getOptionDisabled= { option => option.id === '' } onChange= { (e, item) => { onChange(item.id); } }
                                    value= { barangays.find(data => { return data.id === (getValues()?.barangay !== undefined ? getValues()?.barangay : '') }) } />
                            ) } />
                    </Box>
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.barangay?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>City</Typography>
                    <TextField { ...register('city') } name= "city" fullWidth variant= "standard" value= "Quezon City" disabled InputProps= {{ disableUnderline: true }} sx= { input } />
                </Stack>
            </Grid>
            { getValues()?.type !== 'adoption' ? <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom variant= "body2" sx={{ fontWeight:'600', color:'black'}}>*Reason for surrendering</Typography>
                    <TextareaAutosize name= "reason" { ...register('reason') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { true } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.reason?.message }</Typography>
                </Stack>
            </Grid> : '' }
        </Grid>
    );
}

export default OwnerInformation;