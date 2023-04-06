// Libraries
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { error, input } from "../index.style"; // Styles
import { useParams } from "react-router-dom";

const Account = () => {
    const { type } = useParams();
    const { register, errors } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Email</Typography>
                    <TextField { ...register('email') } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.email?.message }</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } sm= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography gutterBottom color= "text.secondary" variant= "body2">*Password</Typography>
                    <TextField { ...register('password') } type= "password" name= "password" variant= "standard" InputProps= {{ disableUnderline: true }} disabled= { type === 'view' } sx= { input } />
                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors.password?.message }</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Account;