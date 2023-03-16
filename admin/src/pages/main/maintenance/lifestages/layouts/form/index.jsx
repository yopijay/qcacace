// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Box, Checkbox, Grid, Skeleton, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { dropdown, save, specific, update } from "core/api/index.func"; // APIs
import { randomizer, successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, card, btntxt, error, input, select } from "./index.style"; // Styles
import { validation } from "./index.validation";
const dflt = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { textTransform: 'uppercase', fontWeight:'bold' }
        }
    }
}

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError, register, errors, control, getValues, setCheck, check } = useContext(FormCntxt);
    const { data: category, isFetching } = useGet({ key: ['ctg_dropdown'], fetch: dropdown({ table: 'tbl_category', data: {} }) });
    const { refetch, isFetching: fetching } = 
        useGet({ key: ['stages_specific'], fetch: specific({ table: 'tbl_life_stages', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: (data) => {
                if(Array.isArray(data)) {
                    for(let count = 0; count < Object.keys(data[0]).length; count++) {
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name] !== null ? data[0][_name] : '');
                    }
                }
            }
        });

    const { mutate: saving } = 
        usePost({ fetch: save, 
            onSuccess: (data) => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/maintenance/lifestages', { replace: true })); }
            }
        });

    const { mutate: updating } = 
        usePost({ fetch: update, 
            onSuccess: (data) => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/maintenance/lifestages', { replace: true })); }
            }
        });

    useEffect(() => { if(type === 'new') { setValue('series_no', randomizer(7)); } }, [ type, setValue ]);
    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Life Stages</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/lifestages"><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <ThemeProvider theme= { theme(dflt) }>
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 7 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom color= "text.secondary" variant= "body2">Series No.</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                                    <TextField { ...register('series_no') } name= "series_no" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { true } sx= { input } /> }
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 7 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom color= "text.secondary">*Pet Category</Typography>
                                { isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                                    <Box sx= { select }>
                                        <Controller control= { control } name= "category_id" defaultValue= { 0 }
                                            render= { ({ field: { onChange, value } }) => (
                                                <Autocomplete options= { category } disabled= { type === 'view' } disableClearable
                                                    getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                                    isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                                    onChange= { (e, item) => onChange(item.id) }
                                                    renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                                    value= { category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) !== undefined ?
                                                        category?.find(data => { return data.id === (getValues().category_id !== undefined ? getValues().category_id : value) }) : category?.length === 0 ?
                                                        { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } />
                                            ) } /> 
                                    </Box> : '' }
                                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.category_id?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 7 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom color= "text.secondary">*Name</Typography>
                                <TextField { ...register('name') } name= "name" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.name?.message }</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 12 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography gutterBottom>Status</Typography>
                                { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }} name= "status" { ...register('status', { onChange: () => setCheck(!check) }) } 
                                            disabled= { type === 'view' } checked= { getValues().status !== undefined ? getValues().status > 0 ? true : false : check } />
                                        <Typography gutterBottom sx= {{ marginTop: '7px' }}>
                                            { getValues().status !== undefined ? getValues().status > 0 ? 'Active' : 'Inactive' : check ? 'Active' : 'Inactive' }</Typography>
                                    </Box> }
                            </Stack>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            
                            if(data.category_id !== 0) {
                                if(type === 'new') { saving({ table: 'tbl_life_stages', data: data }); }
                                else { updating({ table: 'tbl_life_stages', data: data }); }
                            }
                            else { setError('category_id', { message: 'This field is required!' }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;