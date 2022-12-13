// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Box, Grid, Skeleton, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { get, save, update } from "core/api/index.func"; // APIs
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { input as theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, title, card, btntxt, error, input, select } from "./index.style"; // Styles
import { validation } from "./index.validation";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError, register, errors, control, getValues } = useContext(FormCntxt);
    const { data: category, isFetching } = useGet(['category'], get({ table: 'tbl_pet_category', type: 'dropdown', query: 'WHERE status= 1 ORDER BY name ASC' }), {});
    const { refetch } = useGet(['brd_specific'], get({ table: 'tbl_breed', type: 'specific', query: id ?? null }), { enabled: type !== 'new', refetchOnWindowFocus: false }, 
        (data) => { if(Array.isArray(data)) { for(let count = 0; count < Object.keys(data[0]).length; count++) { let _name = Object.keys(data[0])[count]; setValue(_name, data[0][_name] !== null ? data[0][_name] : ''); } } });

    const { mutate: saving } = usePost(save,
        (data) => { console.log(data); if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/breed', { replace: true })); } });

    const { mutate: updating } = usePost(update,
        (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/breed', { replace: true })); } });

    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/breed" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
                <Typography sx= { title }>Breed ({ type })</Typography>
            </Stack>
            <Box sx= { card }>
                <ThemeProvider theme= { theme }>
                    <form autoComplete= "off">
                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: { xs: '40px 15px', sm: '40px 35px' } }}>
                            <Grid item xs= { 12 } sm= { 6 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography gutterBottom color= "text.secondary">*Pet Category</Typography>
                                    {
                                        isFetching ? <Skeleton variant= "rectangular" height= "35px" sx= {{ borderRadius: '5px' }} /> : category?.length > 0 ?
                                            <Box sx= { select }>
                                                <Controller control= { control } name= "pet_category_id" defaultValue= { 0 }
                                                    render= { ({ field: { onChange, value } }) => (
                                                        <Autocomplete options= { category } disabled= { type !== 'new' } disableClearable
                                                            getOptionLabel= { category => category.name || category.id } noOptionsText= "No results.." getOptionDisabled= { option => option.id === 0 }
                                                            isOptionEqualToValue= { (option, value) => option.name === value.name || option.id === value.id }
                                                            onChange= { (e, item) => onChange(item.id) }
                                                            renderInput= { params => ( <TextField { ...params } variant= "standard" size= "small" fullWidth= { true } /> ) } 
                                                            value= { category?.find(data => { return data.id === (getValues().pet_category_id !== undefined ? getValues().pet_category_id : value) }) !== undefined ?
                                                                category?.find(data => { return data.id === (getValues().pet_category_id !== undefined ? getValues().pet_category_id : value) }) : category?.length === 0 ?
                                                                { id: 0, name: '-- SELECT AN ITEM BELOW --' } : category[0] } />
                                                    ) } /> 
                                            </Box> : ''
                                    }
                                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.pet_category_id?.message }</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs= { 12 } sm= { 6 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography gutterBottom color= "text.secondary">*Name</Typography>
                                    <TextField { ...register('name') } name= "name" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.name?.message }</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </ThemeProvider>
            </Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));

                            if(data.pet_category_id === 0) { setError('pet_category_id', { message: 'This field is required!' }); }
                            else {
                                if(type === 'new') { saving({ table: 'tbl_breed', type: 'save', data: data }); }
                                else { updating({ table: 'tbl_breed', type: 'update', query: id, data: data }); }
                            }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;