// Libraries
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/Form"; // Context

// Custom style
const input = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '6px 8px',
        md: '8px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px'
}

const Email = () => {
    const { register, errors } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
            <Grid item xs= { 12 } sm= { 8 } lg= { 6}>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                        <Typography variant= "body2" gutterBottom sx={{ fontWeight:'600', fontSize:'15px'}}>*Email</Typography>
                        <TextField { ...(register('email')) } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} fullWidth sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.email?.message }</Typography>
                    </Stack>
            </Grid>
        </Grid>
    );
}

export default Email;