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
            input: { textTransform: 'uppercase' }
        }
    }
}

const Surrender = () => {
    const navigate = useNavigate();
    const { handleSubmit, setValidation, setError } = useContext(FormCntxt);
    const { mutate: saving } = usePost({ fetch: save, onSuccess: data => successToast(data.message, 3000, navigate('/services/pet-program', { replace: true })) });

    useEffect(() => { setValidation(validation()); }, [ setValidation ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 } sx= {{ overflow: 'hidden', height: '100%' }}>
            <Container maxWidth= "lg" sx= {{ overflowY: 'scroll', height: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Surrender</Typography>
                    <Typography>A Pet Deserves To Have A Home Where They Can Feel Safe And Loved. Remember That We Are Not Encouraging The Pet Owners To Surrender Their 
                        Pets To Our Shelter But If You Have No Other Choice, We Will Always Welcome Them With A Big Hug And Small Kisses.</Typography>
                </Stack>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ margin: '30px 0' }}>
                    <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                        <Grid item><Photo /></Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} gutterBottom>Pet Classification</Typography>
                                <ThemeProvider theme= { theme(input) }><PetClassification /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}gutterBottom>Other information</Typography>
                                <ThemeProvider theme= { theme(input) }><PetCondition /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}gutterBottom>Owner information</Typography>
                                <Email />
                                <ThemeProvider theme= { theme(input) }><OwnerInformation /></ThemeProvider>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}gutterBottom>Documentary requirements</Typography>
                                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                                    <Grid item xs= { 12 } md= { 6 } lg= { 4 }><ValidId /></Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%' }}>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            let errors = [];

                            if(data.photo === undefined) { errors.push({ name: 'photo', message: 'This field is required' }); }
                            if(data.category_id === 0 || data.category_id === undefined) { errors.push({ name: 'category_id', message: 'This field is required' }); }
                            if(data.breed_id === 0 || data.breed_id === undefined) { errors.push({ name: 'breed_id', message: 'This field is required' }); }
                            if(data.coat_id === 0 || data.coat_id === undefined) { errors.push({ name: 'coat_id', message: 'This field is required' }); }
                            if(data.life_stages_id === 0 || data.life_stages_id === undefined) { errors.push({ name: 'life_stages_id', message: 'This field is required' }); }
                            if((data.tags).length === 0) { errors.push({ name: 'tags', message: 'This field is required' }); }
                            if(data.valid_id === undefined) { errors.push({ name: 'valid_id', message: 'This field is required!' }); }

                            if(!(errors.length > 0)) { saving({ table: 'tbl_surrender', data: data }); }
                            else { errors.forEach(err => setError(err.name, { message: err.message })); }

                        })}>Submit</Box>
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
}

export default Surrender;