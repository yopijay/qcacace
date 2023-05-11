// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Divider, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/Form"; // Context
import { save, specific, update } from "core/api/index.func"; // APIs
import { generateQR, successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, card, btntxt } from "./index.style"; // Styles
import { validation } from "./index.validation"; // Validation

// Layouts
import Photo from "./layouts/Photo";
import Classification from "./layouts/Classification";
import Condition from "./layouts/Condition";
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
    const [ qr, setQR ] = useState();
    const { setValidation, handleSubmit, setValue, setError, getValues } = useContext(FormCntxt);
    const { refetch, isFetching: fetching } = 
        useGet({ key: ['pet_specific'], fetch: specific({ table: 'tbl_pets', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: (data) => { 
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                }
            } 
        });

    const { mutate: saving } = 
        usePost({ fetch: save, 
            onSuccess: (data) => { 
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/maintenance/pet', { replace: true })); } 
            } 
        });

    const { mutate: updating } = 
        usePost({ fetch: update, 
            onSuccess: (data) => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/maintenance/pet', { replace: true })); } 
            } });
        
    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch(); generateQR({ id: id, set: setQR }) } }, [ setValidation, id, refetch, getValues ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Pets</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/pet" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stertch" divider= { <Divider orientation= "horizontal" flexItem /> } sx= { card }>
                <Grid container direction= "column" justifyContent= 'flex-start' alignItems= "stretch" spacing= { 3 }>
                    <Grid item><Photo fetching= { fetching } /></Grid>
                    <Grid item>
                        <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} variant= "body1" gutterBottom>Pet Classification</Typography>
                            <ThemeProvider theme= { theme(dflt) }><Classification fetching= { fetching } /></ThemeProvider>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction= "column" justifyContent= 'flex-start' alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} variant= "body1" gutterBottom>Other</Typography>
                            <ThemeProvider theme= { theme(dflt) }><Condition fetching= { fetching } /></ThemeProvider>
                        </Stack>
                    </Grid>
                    { type === 'update' && getValues()?.is_adopt === 0 ? 
                        <Grid item>
                            <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%' }}>
                                <a href= { qr } download><Avatar src= { qr } alt= "QR Code" sx= {{ width: '200px', height: '200px' }} /></a>
                            </Stack>
                        </Grid> : '' }
                </Grid>
            </Stack>
            { getValues()?.is_adopt !== 1 ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    { getValues()?.status !== undefined && getValues()?.status === 0 ?
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 } sx= {{ padding: '0 5px 0 0' }}>
                            <Box sx= { btntxt } onClick= { handleSubmit(data => {
                                data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                                data['status'] = 1;
                                let _errors = [];
                                
                                if(data.photo === undefined) { _errors.push({ name: 'photo', message: 'This field is required!' }); }
                                if(!((data.tags).length > 0)) { _errors.push({ name: 'tags', message: 'This field is requried!' }); }

                                if(!(_errors.length > 0)) { updating({ table: 'tbl_pets', data: data }); }
                                else { _errors.forEach(err => setError(err.name, { message: err.message }) ); }
                            }) }>Trained</Box>
                        </Grid> : '' }
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 } sx= {{ padding: '0 0 0 5px' }}>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            data['status'] = data.status === 0 ? 0 : 1;
                            let _errors = [];

                            if(data.photo === undefined) { _errors.push({ name: 'photo', message: 'This field is required!' }); }
                            if(data.category_id === 0) { _errors.push({ name: 'category_id', message: 'This field is required!' }); }
                            if(data.breed_id === undefined || data.breed_id === 0) { _errors.push({ name: 'breed_id', message: 'This field is required!' }); }
                            if(data.coat_id === undefined || data.coat_id === 0) { _errors.push({ name: 'coat_id', message: 'This field is required!' }); }
                            if(data.life_stages_id === undefined || data.life_stages_id === 0) { _errors.push({ name: 'life_stages_id', message: 'This field is required!' }); }
                            if(!((data.tags).length > 0)) { _errors.push({ name: 'tags', message: 'This field is requried!' }); }

                            if(!(_errors.length > 0)) {
                                if(type === 'new') { saving({ table: 'tbl_pets', data: data }); }
                                else { updating({ table: 'tbl_pets', data: data }); }
                            }
                            else { _errors.forEach(err => setError(err.name, { message: err.message }) ); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;