// Libraries
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, select } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender
const sterilization = [{ id: 'yes', name: 'YES' }, { id: 'no', name: 'NO' }]; // Gender

const Condition = () => {
    const { type } = useParams();
    const { control, errors, getValues } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= 'flex-start' alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Gender</Typography>
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
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid>
            {/* <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Coat</Typography>
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
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.gender?.message }</Typography>
                </Stack>
            </Grid> */}
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Spayed or Neutered</Typography>
                    <Box sx= { select }>
                        <Controller control= { control } name= "sterilization" defaultValue= "no"
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { sterilization } disableClearable getOptionLabel= { opt => opt.name || opt.id } disabled= { type === 'view' }
                                        noOptionsText= "No results..." isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } getOptionDisabled= { option => option.id === 0 }
                                        onChange= { (e, item) => { onChange(item.id); } }
                                        value= { sterilization.find(data => { return data.id === (getValues().sterilization !== undefined ? getValues().sterilization : value) }) } />
                                ) } />
                    </Box>
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.sterilization?.message }</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Condition;