// Libraries
import { useContext, useEffect } from "react";
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

// Core
import { dropdown } from "core/api/index.func"; // API
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { select } from "../../../../index.style";

const Classification = ({ pet, pet_fetching, srvc_fetching }) => {
    const { getValues, control } = useContext(FormCntxt);
    const { data: category, isFetching: categoryfetching } = useGet({ key: ['ctg_dropdown'], fetch: dropdown({ table: 'tbl_category', data: {} }) });
    const { data: breed, mutate: setbreeds, isLoading: breedloading } = usePost({ fetch: dropdown });
    const { data: coat, mutate: setcoat, isLoading: coatloading } = usePost({ fetch: dropdown });
    const { data: lifestages, mutate: setlifestages, isLoading: lifestagesloading } = usePost({ fetch: dropdown });

    useEffect(() => { 
        if(!pet_fetching && !srvc_fetching) {
            if(getValues()?.category_id !== '') {
                setbreeds({ table: 'tbl_breed', data: { id: getValues().category_id } }); 
                setcoat({ table: 'tbl_coat', data: { id: getValues().category_id } });
                setlifestages({ table: 'tbl_life_stages', data: { id: getValues().category_id } });
            }
        }
    }, [ pet_fetching, srvc_fetching, pet, setbreeds, setcoat, setlifestages, getValues ]);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black'}}>*Pet Category</Typography>
                    { categoryfetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                        <Box sx= { select }>
                            <Controller control= { control } name= "category_id" defaultValue= { 0 }
                                render= { ({ field: { onChange, value } }) => (
                                    <Autocomplete options= { category } disableClearable disabled= { true }
                                        getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                        isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                        onChange= { (e, item) => { 
                                            onChange(item.id); setbreeds({ table: 'tbl_breed', data: { id: item.id } }); 
                                            setcoat({ table: 'tbl_coat', data: { id: item.id } }); setlifestages({ table: 'tbl_life_stages', data: { id: item.id } }); } }
                                        renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                        value= { category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) !== undefined ?
                                                        category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) : 
                                                        category?.length === 0 ? { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } /> ) } /> 
                        </Box> : '' }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black'}}>*Breed</Typography>
                    { breedloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                    { !breedloading ?
                        breed !== undefined ?
                            breed.length > 0 ?
                                <Controller control= { control } name= "breed_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { breed } disabled= { true } disableClearable
                                            getOptionLabel= { breed => breed.name || breed.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || breed.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); } } renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) !== undefined ?
                                                breed?.find(data => { return data.id === (getValues().breed_id !== undefined ? getValues().breed_id : value) }) : breed.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : breed[0] } />
                                    ) } />
                                : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a breed for this category!</Typography>
                            : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
                    </Box> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black'}}>*Coat</Typography>
                    { coatloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                    { !coatloading ?
                        coat !== undefined ?
                            coat.length > 0 ?
                                <Controller control= { control } name= "coat_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { coat } disabled= { true } disableClearable
                                            getOptionLabel= { coat => coat.name || coat.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || coat.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); } } renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { coat?.find(data => { return data.id === (getValues().coat_id !== undefined ? getValues().coat_id : value) }) !== undefined ?
                                                coat?.find(data => { return data.id === (getValues().coat_id !== undefined ? getValues().coat_id : value) }) : coat.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : coat[0] } />
                                    ) } />
                                : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a coat for this category!</Typography>
                            : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
                    </Box> }
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2" sx={{fontWeight:'600', color:'black'}}>*Pet Life Stages</Typography>
                    { lifestagesloading ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : <Box sx= { select }>
                    { !lifestagesloading ?
                        lifestages !== undefined ?
                            lifestages.length > 0 ?
                                <Controller control= { control } name= "life_stages_id" defaultValue= { 0 }
                                    render= { ({ field: { onChange, value } }) => (
                                        <Autocomplete options= { lifestages } disabled= { true } disableClearable
                                            getOptionLabel= { lifestages => lifestages.name || lifestages.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                            isOptionEqualToValue= { (option, value) => option.name === value.name || lifestages.id === value.id }
                                            onChange= { (e, item) => { onChange(item.id); } } renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                            value= { lifestages?.find(data => { return data.id === (getValues().life_stages_id !== undefined ? getValues().life_stages_id : value) }) !== undefined ?
                                                lifestages?.find(data => { return data.id === (getValues().life_stages_id !== undefined ? getValues().life_stages_id : value) }) : lifestages.length === 0 ?
                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : lifestages[0] } />
                                    ) } />
                                : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">You must create a lifes tages for this category!</Typography>
                            : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Please select a pet category first!</Typography>
                        : <Typography variant= "body1" sx= {{ padding: '4px 0' }} color= "text.disabled">Loading...</Typography> }
                    </Box> }
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Classification;