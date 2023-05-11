// Libraries
import { Stack, TextField, Typography } from "@mui/material";
import { FormCntxt } from "core/context/Form";
import { useContext } from "react";

// Constants
import { input } from "../index.style"; // Styles

const Email = () => {
    const { register, errors } = useContext(FormCntxt);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Typography variant= 'body2' gutterBottom>*Email</Typography>
            <TextField { ...register('email') } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.email?.message }</Typography>
        </Stack>
    );
}

export default Email;