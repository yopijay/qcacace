// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { save, specific, update } from "core/api/index.func"; // APIs
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { input } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, card, btntxt } from "./index.style"; // Styles
import { validation } from "./index.validation"; // Validation

// Layouts
import Photo from "./layouts/Photo";
import Info from "./layouts/Info";
import Other from "./layouts/Other";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError } = useContext(FormCntxt);
    const { refetch, isFetching: fetching } = 
        useGet({ key: ['pet_specific'], fetch: specific({ table: 'tbl_pets', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
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
                if(data.result === 'error') { 
                    (data.error).forEach((err, index) => { 
                        setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); 
                    }); 
                } 
                else { successToast(data.message, 3000, navigate('/maintenance/pet', { replace: true })); } 
            } 
        });

    const { mutate: updating } = 
        usePost({ fetch: update, 
            onSuccess: (data) => { 
                if(data.result === 'error') { 
                    (data.error).forEach((err, index) => { 
                        setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); 
                    }); 
                } 
                else { successToast(data.message, 3000, navigate('/maintenance/pet', { replace: true })); } 
            } 
        });
        
    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Pets</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/pet" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <Photo fetching= { fetching } />
                <form autoComplete= "off"><ThemeProvider theme= { input }><Info fetching= { fetching } /></ThemeProvider></form>
                <form autoComplete= "off"><ThemeProvider theme= { input }><Other fetching= { fetching } /></ThemeProvider></form>
            </Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            
                            if(data.photo !== undefined) {
                                if(data.pet_category_id !== 0) {
                                    if(data.breed_id !== 0) {
                                        if(type === 'new') { saving({ table: 'tbl_pets', data: data }); }
                                        else { updating({ table: 'tbl_pets', data: data }); }
                                    }
                                    else { setError('breed_id', { message: 'This field is required!' }); }
                                }
                                else { setError('pet_category_id', { message: 'This field is required!' }); }
                            }
                            else { setError('photo', { message: 'This field is required!' }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;