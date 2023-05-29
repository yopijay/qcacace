// Libraries
import { Box, Container, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Core
import { theme } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, usePost } from "core/global/function/index.func"; // Function
import { save } from "core/api/index.func"; // API

// Layouts
import Photo from "./surrender/Photo";
import PetClassification from "./surrender/PetClassification";
import PetCondition from "./surrender/PetCondition";
import OwnerInformation from "./surrender/OwnerInformation";
import Email from "./surrender/Email";
import ValidId from "./surrender/documents/ValidId";

// Constants
import { validation } from "./surrender/index.validation"; //  Validation
import { btntxt } from "../index.style"; // Styles
const input = {
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

const email = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { fontWeight:'bold' }
        }
    }
}

const Surrender = () => {
    const navigate = useNavigate();
    const { handleSubmit, setValidation, setError } = useContext(FormCntxt);
    const { mutate: saving } = usePost({ fetch: save, onSuccess: data => {
        if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
        else { successToast(data.message, 3000, navigate('/services/pet-program', { replace: true })); }
    } });

    useEffect(() => { setValidation(validation()); }, [ setValidation ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 } sx= {{ overflow: 'hidden', height: '100%' }}>
            <Container maxWidth= "lg" sx= {{ overflowY: 'scroll', height: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Surrender</Typography>
                    <Typography sx= {{ fontWeight:'600'}}>A pet deserves to have a home where they can feel safe and loved. Remember that we are not encouraging the pet owners to surrender 
                        their pets to our shelter but if you have no other choice, we will always welcome them with a big hug and small kisses.</Typography>
                </Stack>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ margin: '30px 0' }}>
                    <form autoComplete= "off">
                        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                            <Grid item><Photo /></Grid>
                            <Grid item>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }} gutterBottom>Pet Classification</Typography>
                                    <ThemeProvider theme= { theme(input) }><PetClassification /></ThemeProvider>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Other information</Typography>
                                    <ThemeProvider theme= { theme(input) }><PetCondition /></ThemeProvider>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Owner information</Typography>
                                    <ThemeProvider theme= { theme(email) }><Email /></ThemeProvider>
                                    <ThemeProvider theme= { theme(input) }><OwnerInformation /></ThemeProvider>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography sx= {{ fontWeight: '600', textTransform: 'uppercase', color:'black', fontSize:'18px' }}gutterBottom>Documentary requirements</Typography>
                                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                                        <Grid item xs= { 12 } md= { 6 } lg= { 4 }><ValidId /></Grid>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%' }}>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            let errors = [];
                            data['type'] = 'surrender';
                            data['application_type'] = 'online';

                            if(data.photo === undefined) { errors.push({ name: 'photo', message: 'This field is required' }); }
                            if(data.category_id === 0 || data.category_id === undefined) { errors.push({ name: 'category_id', message: 'This field is required' }); }
                            if(data.breed_id === 0 || data.breed_id === undefined) { errors.push({ name: 'breed_id', message: 'This field is required' }); }
                            if(data.coat_id === 0 || data.coat_id === undefined) { errors.push({ name: 'coat_id', message: 'This field is required' }); }
                            if(data.life_stages_id === 0 || data.life_stages_id === undefined) { errors.push({ name: 'life_stages_id', message: 'This field is required' }); }
                            if((data.tags).length === 0) { errors.push({ name: 'tags', message: 'This field is required' }); }
                            if(data.valid_id === undefined || data.valid_id === '') { errors.push({ name: 'valid_id', message: 'This field is required!' }); }
                            if(data.street === '') { errors.push({ name: 'street', message: 'This field is required!' }); }
                            if(data.barangay === undefined) { errors.push({ name: 'barangay', message: 'This field is required!' }); }

                            if(!(errors.length > 0)) { saving({ table: 'tbl_services', data: data }); }
                            else { errors.forEach(err => setError(err.name, { message: err.message })); } 
                        })}>Submit</Box>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
}

export default Surrender;