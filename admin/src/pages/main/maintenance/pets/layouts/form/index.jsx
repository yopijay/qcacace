// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { get, save, update } from "core/api/index.func"; // APIs
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { input as theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, title, card, btntxt } from "./index.style"; // Styles
import { validation } from "./index.validation"; // Validation
import Form from "./layouts/Form"; // Layouts

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError } = useContext(FormCntxt);
    const { refetch } = useGet(['pet_specific'], get({ table: 'tbl_pets', type: 'specific', query: id ?? null }), { enabled: type !== 'new', refetchOnWindowFocus: false }, 
        (data) => { if(Array.isArray(data)) { for(let count = 0; count < Object.keys(data[0]).length; count++) { let _name = Object.keys(data[0])[count]; setValue(_name, data[0][_name] !== null ? data[0][_name] : ''); } } });

    const { mutate: saving } = usePost(save, (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/pets', { replace: true })); } });
    const { mutate: updating } = usePost(update, (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/pets', { replace: true })); } });
    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/pets" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
                <Typography sx= { title }>Pet Information ({ type })</Typography>
            </Stack>
            <Box sx= { card }><ThemeProvider theme= { theme }><form autoComplete= "off"><Form /></form></ThemeProvider></Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));

                            if(data.category_id === 0) { setError('category_id', { message: 'This field is required!' }); }
                            else if(data.breed_id === 0) { setError('breed_id', { message: 'This field is required!' }); }
                            else {
                                if(type === 'new') { saving({ table: 'tbl_pets', type: 'save', data: data }); }
                                else { updating({ table: 'tbl_pets', type: 'update', query: id, data: data }); }
                            }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;