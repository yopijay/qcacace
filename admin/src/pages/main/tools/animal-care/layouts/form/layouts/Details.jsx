// Libraries
import { Box, Checkbox, Grid, Skeleton, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/Form"; // Context

// Constants
import { input, textarea } from "../index.style"; // Styles

const Details = ({ fetching }) => {
    const { type } = useParams();
    const { register, errors, getValues, check, setCheck } = useContext(FormCntxt);

    return (
        <form autoComplete= "off">
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                <Grid item xs= { 12 } sm= { 7 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography gutterBottom variant= "body2">*Title:</Typography>
                        { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                            <TextField { ...register('title') } name= "title" size= "small" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /> }
                        <Typography variant= "body2" color= "error.dark">{ errors.title?.message }</Typography>
                    </Stack>
                </Grid>
                <Grid item xs= { 12 } sm= { 5 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography gutterBottom variant= "body2">Subtitle:</Typography>
                        { fetching ? <Skeleton variant= "rounded" height= "35px" /> :
                            <TextField { ...register('subtitle') } name= "subtitle" size= "small" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } /> }
                    </Stack>
                </Grid>
                <Grid item xs= { 12 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography gutterBottom variant= "body2">*Description</Typography>
                        { fetching ? <Skeleton variant= "rectangular" height= "100px" sx= {{ borderRadius: '5px' }} /> : 
                            <TextareaAutosize name= "description" { ...register('description') } minRows= { 4 } maxRows= { 4 } style= { textarea } disabled= { type === 'view' } /> }
                        <Typography variant= "body2" color= "error.dark">{ errors.description?.message }</Typography>
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
        </form>
    );
}

export default Details;