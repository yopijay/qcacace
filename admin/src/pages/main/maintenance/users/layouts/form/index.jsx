// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

// Core
import { input } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { get, save, specific, update } from "core/api/index.func"; // APIs

// Constants
import { btnicon, btntxt, card } from "./index.style"; // Styles 
import { validation } from "./index.validation"; // Validation

// Layouts
import Account from "./layouts/Account";
import OtherInfo from "./layouts/OtherInfo";
import Profile from "./layouts/Profile";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError } = useContext(FormCntxt);
    const { refetch } = useGet({ key: ['usr_specific'], fetch: specific({ table: 'tbl_users', id: id ?? null }), options: { enabled: type !== 'new', referchOnWindowFocus: false },
        onSuccess: (data) => { if(Array.isArray(data)) { for(let count = 0; count < Object.keys(data[0]).length; count++) { let _name = Object.keys(data[0])[count]; setValue(_name, data[0][_name] !== null ? _name === 'password' ? atob(data[0][_name]) : data[0][_name] : ''); } } } });

    const { mutate: saving } = usePost({ fetch: save, 
        onSuccess: (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/users', { replace: true })); } } });

    // const { mutate: updating } = usePost(update,
    //     (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/maintenance/users', { replace: true })); } });

    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Users</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/users" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <Profile />
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" divider= { <Divider orientation="horizontal" flexItem /> } spacing= { 2 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px' }}>Account Information</Typography>
                            <Account />
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px' }}>Other Information</Typography>
                            <ThemeProvider theme= { input }><OtherInfo /></ThemeProvider>
                        </Stack>
                    </Stack>
                </form>
            </Box>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            data['password'] = btoa(data.password);
                            
                            if(data.avatar !== undefined) {
                                if(type === 'new') { saving({ table: 'tbl_users', data: data }); }
                                // else { updating({ table: 'tbl_users', type: 'update', query: id, data: data }); }
                            }
                            else { setError('avatar', { message: 'This field is required!' }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;