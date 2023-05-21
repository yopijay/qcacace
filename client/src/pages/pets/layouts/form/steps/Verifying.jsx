// Libraries
import { Avatar, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { verifying } from "core/api/index.func"; // API
import { successToast, usePost } from "core/global/function/index.func"; // Functionn

// Constants
import Logo from "assets/images/logo.png"; // Assets
import { btntxt, inputcode, instruction } from "../index.style"; // Styles
import Timer from "core/global/layout/timer";

const Verifying = () => {
    const { id, userid } = useParams();
    const [ timer, setTimer ] = useState('00:00');
    const navigate = useNavigate();
    const { errors, register, setFocus, handleSubmit, setError, getValues } = useContext(FormCntxt);

    const { mutate: verify } = 
        usePost({ fetch: verifying, onSuccess: (data) => {
            if(data.result === 'error') { setError(data.errors[0].name, { message: data.errors[0].message }); }
            else { successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${btoa(data.id)}/personal-information`)); }
        } 
    });

    useEffect(() => { if(getValues().email === undefined) { window.location.href= `/pets/${id}/adopt`; } }, [getValues, id]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 5 } sx= {{ padding: { xs: 0, sm: '0 30px' } }}>
            <Avatar src= { Logo } sx= {{ width: 160, height: 160 }} />
            <Typography sx= { instruction }>We are conducting KYC Verification by Quezon City Animal Care & Adoption Center. This is to protect our 
                customers from AMLA and Money Mules. Please bear with us.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 2 } sx= {{ width: '100%' }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 4 }>
                    <form autoComplete= "off">
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                            <Typography variant= "h6" sx={{ fontWeight:'600'}}>Enter verification code</Typography>
                            <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                                { ([1, 2, 3, 4, 5, 6]).map(item => (
                                    <Grid item xs= { 2 } sx= {{ padding: item === 1 ? '0 2.5px 0 5px' : item === 6 ? '0 5px 0 2.5px' : '0 2.5px' }} key= { item }>
                                        <TextField { ...(register(`code${item}`)) } name= { `code${item}` } variant= "standard" 
                                            InputProps= {{ disableUnderline: true }} fullWidth sx= { inputcode } inputProps= {{ maxLength: 1 }}
                                            onChange= { e => { setError('code', { message: '' }); setFocus(`code${parseInt(item) === 6 || e.target.value === '' ? item : parseInt(item) + 1}`); } } />
                                    </Grid>
                                )) }
                            </Grid>
                            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.code?.message }</Typography>
                            <Timer timer= { timer } setTimer= { setTimer } />
                        </Stack>
                    </form>
                    <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                        <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                            <Box sx= { btntxt } component= { Link } to= { `/pets/${id}/adopt/verification` }>Back</Box>
                        </Grid>
                        <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                            { timer !== '00:00' ?    
                                <Box sx= { btntxt } onClick= { handleSubmit(data => {
                                    if(data.code1 !== '' && data.code2 !== '' && data.code3 !== '' && data.code4 !== '' && data.code5 !== '' && data.code6 !== '') {
                                        let code = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;
                                        verify({ id: atob(userid), pet_id: atob(id), code: code, email: data.email });
                                    }
                                    else { setError('code', { message: 'Verification code must not be empty!' }); }
                                })}>Verify</Box> : '' }
                        </Grid>
                    </Grid> 
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Verifying;