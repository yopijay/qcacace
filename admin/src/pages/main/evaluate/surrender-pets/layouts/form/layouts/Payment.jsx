// Libraries
import { Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/Form"; // Core

// Constants
import { input } from "./surrender.style"; // Styles

const Payment = () => {
    const { register, errors } = useContext(FormCntxt);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Typography gutterBottom variant= "body2">*Reference no.</Typography>
            <TextField { ...register('reference_no') } name= "reference_no" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.reference_no?.message }</Typography>
        </Stack>
    );
}

export default Payment;