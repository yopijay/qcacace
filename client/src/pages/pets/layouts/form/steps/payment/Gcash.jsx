// Libraries
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import QR from "assets/images/qr.jpg"; // Assets
import { input } from "../../index.style"; // Styles

const Gcash = () => {
    const { register, errors} = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography>Instruction:</Typography>
            <Typography>- Sed dapibus, metus vel scelerisque commodo, odio ipsum dictum est</Typography>
            <Typography>- Sed dapibus, metus vel scelerisque commodo, odio ipsum dictum est</Typography>
            <Typography>- Sed dapibus, metus vel scelerisque commodo, odio ipsum dictum est</Typography>
            <Typography>- Sed dapibus, metus vel scelerisque commodo, odio ipsum dictum est</Typography>
            <Typography>- Sed dapibus, metus vel scelerisque commodo, odio ipsum dictum est</Typography>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>  
                <Avatar variant= "rounded" src= { QR } sx= {{ width: '200px', height: '200px' }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '70%' }}>
                        <Typography>Reference No.</Typography>
                        <TextField { ...register('transaction_no') } name= "transaction_no" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.transaction_no?.message }</Typography>
                    </Stack>
            </Stack>
        </Stack>
    );
}

export default Gcash;