// Libraries
import { useContext } from "react";

// Core
import { dropdown } from "core/api/index.func"; // API
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

// Constants
import { input, select } from "../../../../index.style";
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender
const sterilization = [{ id: 'yes', name: 'YES' }, { id: 'no', name: 'NO' }]; // Sterilization
const energy = [{ id: 'high', name: 'HIGH ENERGY' }, { id: 'low', name: 'LOW ENERGY' }]; // Energy
const weight = [{ id: 'underweight', name: 'UNDERWEIGHT' }, { id: 'ideal', name: 'IDEAL' }, { id: 'overweight', name: 'OVERWEIGHT' }]; // Weight

const Condition = ({ pet_fetching, srvc_fetching }) => {
    const { control, getValues, register } = useContext(FormCntxt);
    const { data: tags, isFetching: tagfetching } = useGet({ key: ['tag_dropdown'], fetch: dropdown({ table: 'tbl_tags', data: {} }) });

    return (
        <Grid container direction= "row" justifyContent= 'flex-start' alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Gender</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('gender') } name= "gender" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Energy level</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('energy_level') } name= "energy_level" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Spayed or neutered</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('sterilization') } name= "sterilization" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Weight</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('weight') } name= "weight" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 7 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Color</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Tags</Typography>
                    { pet_fetching && srvc_fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <TextField { ...register('tags') } name= "tags" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Condition;