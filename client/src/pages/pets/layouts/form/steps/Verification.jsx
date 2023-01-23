// Libraries
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { registration } from "core/api/index.func"; // API
import { successToast, usePost } from "core/global/function/index.func"; // Function

// Constants
import { btntxt, inputemail, instruction } from "../index.style"; // Styles
import { verification } from "../index.validation"; // Validation

const Verification = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValidation, errors } = useContext(FormCntxt);
    const { mutate: rgstr, isLoading: loading } = usePost({ fetch: registration, onSuccess: (data) => {
        if(data.result === 'success') { successToast(data.message, 3000, navigate(`/pets/adopt/${id}/personal-information/${btoa(data.id)}`, { replace: true })); }
    } });

    useEffect(() => setValidation(verification()), [ setValidation ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 5 } sx= {{ padding: { xs: 0, sm: '0 30px' } }}>
            <Typography sx= { instruction }>We are conducting KYC Verification by Quezon City Animal Care & Adoption Center. This is to protect our 
                customers from AMLA and Money Mules. Please bear with us.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                    <Typography variant= "h6">Enter your email address</Typography>
                    <TextField { ...(register('email')) } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} fullWidth sx= { inputemail } />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.email?.message }</Typography>
                </Stack>
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } md= { 5 } lg= { 3 }>
                        { !loading ? 
                            <Box sx= { btntxt } onClick= { handleSubmit((data) => rgstr(data) )}>Verify</Box> : 
                            <Box sx= { btntxt }>Verifying</Box>}
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}

export default Verification;