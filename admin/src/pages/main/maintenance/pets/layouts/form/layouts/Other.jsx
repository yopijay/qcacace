// Libraries
import { Autocomplete, Box, Checkbox, Grid, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, input, select, textarea } from "../index.style"; // Styles
const gender = [{ id: 'male', name: 'MALE' }, { id: 'female', name: 'FEMALE' }]; // Gender

const Form = ({ fetching }) => {
    const { type } = useParams();
    const { getValues, control, errors, register, check, setCheck } = useContext(FormCntxt);
    // const [ qrcode, setQrcode ] = useState('');
    // const { data: category, isFetching } = useGet(['category'], get({ table: 'tbl_pet_category', type: 'dropdown', query: 'WHERE status= 1 ORDER BY name ASC' }), {});
    // const { data: breed, mutate: menu, isLoading } = usePost(dropdown);

    // useEffect(() => { if(!isFetching) { if(type !== 'new') { menu({ table: 'tbl_breed', data: { query: getValues()?.category_id} }); } } }, [isFetching, type, menu, getValues]);
    // useEffect(() => { if(!isFetching) if(type === 'view') generateQR(getValues().series_no, setQrcode); }, [ isFetching, getValues, type]);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 5 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Age</Typography>
                    <TextField { ...register('age') } name= "age" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.age?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 3 }>
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
            <Grid item xs= { 4 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Size</Typography>
                    <TextField { ...register('size') } name= "size" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.size?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 3 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Color</Typography>
                    <TextField { ...register('color') } name= "color" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.color?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Tags</Typography>
                    <TextareaAutosize name= "tags" { ...register('tags') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.tags?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary">*Desciprtion</Typography>
                    <TextareaAutosize name= "description" { ...register('description') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.description?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom>Status</Typography>
                    { fetching ? <Skeleton variant= "rounded" height= "35px" /> : 
                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }} name= "status" { ...register('status', { onChange: () => setCheck(!check) }) } disabled= { type === 'view' } checked= { getValues().status !== undefined ? getValues().status > 0 ? true : false : check } />
                            <Typography gutterBottom sx= {{ marginTop: '7px' }}>{ getValues().status !== undefined ? getValues().status > 0 ? 'Active' : 'Inactive' : check ? 'Active' : 'Inactive' }</Typography>
                        </Box> }
                </Stack>
            </Grid>
            {/* 
            { type === 'view' ? 
                <Grid item xs= { 12 }>
                    <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src= { qrcode } alt= "qrcode" style= {{ width: '250px', height: '250px' }} />
                    </Box>
                </Grid> : '' } */}
        </Grid>
    );
}

export default Form;