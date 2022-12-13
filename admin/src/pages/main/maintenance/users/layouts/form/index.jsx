// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

// Core
import { input } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { get, save, update } from "core/api/index.func"; // APIs

// Constants
import { btnicon, btntxt, card, title } from "./index.style"; // Styles 
import { validation } from "./index.validation"; // Validation

// Layouts
import Account from "./layouts/Account";
import OtherInfo from "./layouts/OtherInfo";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError } = useContext(FormCntxt);
    const { refetch } = useGet(['usr_specific'], get({ table: 'tbl_users', type: 'specific', query: id ?? null }), { enabled: type !== 'new', refetchOnWindowFocus: false }, 
        (data) => { if(Array.isArray(data)) { for(let count = 0; count < Object.keys(data[0]).length; count++) { let _name = Object.keys(data[0])[count]; setValue(_name, data[0][_name] !== null ? _name === 'password' ? atob(data[0][_name]) : data[0][_name] : ''); } } });

    const { mutate: saving } = usePost(save,
        (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/users', { replace: true })); } });

    const { mutate: updating } = usePost(update,
        (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/users', { replace: true })); } });

    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/users" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
                <Typography sx= { title }>Users ({ type })</Typography>
            </Stack>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Box sx= {{ borderBottom: 'dashed 1px #919eab73', padding: '40px 0' }}>
                        <Typography gutterBottom sx= {{ fontWeight: 'bold', textTransform: 'uppercase', padding: { xs: '0 15px', sm: '0 35px' } }} variant= "body1">Account Information</Typography>
                        <Account />
                    </Box>
                    <Box sx= {{ padding: '40px 0' }}>
                        <Typography gutterBottom sx= {{ fontWeight: 'bold', textTransform: 'uppercase', padding: { xs: '0 15px', sm: '0 35px' } }} variant= "body1">Other Information</Typography>
                        <ThemeProvider theme= { input }><OtherInfo /></ThemeProvider>
                    </Box>
                </form>
            </Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            data['password'] = btoa(data.password);
                            
                            if(type === 'new') { saving({ table: 'tbl_users', type: 'save', data: data }); }
                            else { updating({ table: 'tbl_users', type: 'update', query: id, data: data }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;