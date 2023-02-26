// Libraries
import { Avatar, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { save } from "core/api/index.func"; // API
import { successToast, usePost } from "core/global/function/index.func"; // Function

// Constants
import { btntxt, inputemail, instruction } from "../index.style"; // Styles
import { verification } from "../index.validation"; // Validation
import Logo from "assets/images/logo.png"; // Assets

const Registration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValidation, errors, getValues, setValue } = useContext(FormCntxt);
    const { mutate: saving } = 
        usePost({ fetch: save, onSuccess: (data) => {
            if(data.result === 'success') { 
                setValue('id', btoa(data.id));
                successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${btoa(data.id)}/verify`)); 
            }
        }
    });

    useEffect(() => { setValidation(verification()); }, [ setValidation ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 5 } sx= {{ padding: { xs: 0, sm: '0 30px' }, height: '100%' }}>
            <Avatar src= { Logo } sx= {{ width: 160, height: 160 }} />
            <Typography sx= { instruction }>We are conducting KYC Verification by Quezon City Animal Care & Adoption Center. This is to protect our 
                customers from AMLA and Money Mules. Please bear with us.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ width: '100%', height: '100%' }}>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        <Typography variant= "h6">Enter your email address</Typography>
                        <TextField { ...(register('email')) } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} fullWidth sx= { inputemail } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.email?.message }</Typography>
                    </Stack>
                </form>
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 6 } sm= { 4 } md= { 5 } lg= { 3 }>
                        { getValues().email === '' ? <Box sx= { btntxt } onClick= { handleSubmit((data) => saving({ table: 'tbl_furr_parent', data: data }) )}>Verify</Box> :
                            <Box sx= { btntxt } component= { Link } to= { `/pets/${id}/adopt/${getValues().id}/verify` }>Verify</Box> }
                    </Grid>
                </Grid> 
            </Stack>
        </Stack>
    );
}

export default Registration;