// Libraries
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func";

// Constants
import { btntxt, date, input, select } from "../index.style"; // Styles
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

const Qualification = () => {
    const navigate = useNavigate();
    const { control, register, getValues, errors, setError } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 1 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 2 } sx= {{ flexGrow: 1 }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                    <Typography sx= {{ fontWeight: '600' }} gutterBottom>*Birthdate</Typography>
                    <Box sx= { date }>
                        <Controller control= { control } name= "birthdate" defaultValue= { `${dayjs(new Date()).year()}-${dayjs(new Date()).month() + 1}-${dayjs(new Date()).date()}` }
                            render= { ({ field: { onChange, value } }) => (
                                <LocalizationProvider dateAdapter= { AdapterDayjs }>
                                    <DatePicker value= { value } renderInput= { (params) => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                        onChange= { e => { onChange(`${dayjs(e).year()}-${dayjs(e).month() + 1}-${dayjs(e).date()}`); } } />
                                </LocalizationProvider> ) }>
                        </Controller>
                    </Box>
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.birthdate?.message }</Typography>
                </Stack>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx= {{ fontWeight: '600' }} gutterBottom>*Address</Typography>
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                        <Grid item xs= { 12 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography variant= "body2" sx= {{ fontWeight: '600' }} gutterBottom>Street</Typography>
                                <TextField { ...register('street') } name= "street" fullWidth variant= "standard"  InputProps= {{ disableUnderline: true }} sx= { input } />
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
            </Stack>
            <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                <Grid item xs= { 6 } sm= { 4 } md=  { 5 } lg= { 3 }>
                    <Box sx= { btntxt } onClick= { () => {
                        let errors = [];

                        if((parseInt((new Date()).getFullYear()) - parseInt((new Date(getValues().birthdate)).getFullYear())) < 18) { errors.push({ name: 'birthdate', message: 'Age must be 18 and above!' }); }
                        if(getValues().street === '') { errors.push({ name: 'street', message: 'This field is required!' }); }
                        if(getValues().barangay === undefined) { errors.push({ name: 'barangay', message: 'This field is required!' }); }

                        if(!(errors.length > 0)) { navigate('verification'); }
                        else { errors.forEach(err => setError(err.name, { message: err.message })); }
                    } }>Proceed</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Qualification;