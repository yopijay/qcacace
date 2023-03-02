// Libraries
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { generateQR } from "core/global/function/index.func";
import { input } from "../../../index.style";

const Gcash = () => {
    const { register, errors} = useContext(FormCntxt);
    const [ qr, setQR ] = useState();

    useEffect(() => { generateQR({ id: 'sample', set: setQR }); }, []);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ marginTop: '20px' }}>
            <Typography><b>Instruction:</b></Typography>
            <Typography>- On your Gcash app, Tap View All</Typography>
            <Typography>- Tap QR, Tap SCan QR</Typography>
            <Typography>- Align your phone's camera to the store's QR code to scan it. Make sure the QR code
                            is within frame.</Typography>
            <Typography>- Input the total amount to be paid and tap NEXT.</Typography>
            <Typography>- Review all details then tap Pay</Typography>
            <Typography>- You will see your in-app receipt on screen as well as receive an SMS receipt to confirm your transaction.</Typography>
            <Typography>- Please provide the Referrence ID</Typography>
            <Typography><b>PS: This is non-refundable, please be careful before sending.</b></Typography>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>  
                <Avatar variant= "rounded" src= { qr } sx= {{ width: '200px', height: '200px' }} />
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                    <Typography>Reference No.</Typography>
                    <TextField { ...register('transaction_no') } name= "transaction_no" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } fullWidth />
                    <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.transaction_no?.message }</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Gcash;