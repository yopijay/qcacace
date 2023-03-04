// Libraries
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import QR from "assets/images/qr.jpg"; // Assets
import { input } from "./index.styles"; // Styles

const Gcash = ({ type }) => {
    const { register, errors} = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography><b>Instruction:</b></Typography>
            { type !== 'surrender' ? <Typography>- On your Gcash app, Tap View All</Typography> : '' }
            { type !== 'surrender' ? <Typography>- Tap QR, Tap SCan QR</Typography> : '' }
            { type !== 'surrender' ? <Typography>- Align your phone's camera to the store's QR code to scan it. Make sure the QR code
                            is within frame.</Typography> : '' }
            { type !== 'surrender' ? <Typography>- Input the total amount to be paid and tap NEXT.</Typography> : '' }
            { type !== 'surrender' ? <Typography>- Review all details then tap Pay</Typography> : '' }
            { type !== 'surrender' ? <Typography>- You will see your in-app receipt on screen as well as receive an SMS receipt to confirm your transaction.</Typography> : '' }
            <Typography>- Please provide the Referrence ID</Typography>
            <Typography><b>PS: This is non-refundable, please be careful before sending.</b></Typography>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>  
                { type !== 'surrender' ? <Avatar variant= "rounded" src= { QR } sx= {{ width: '200px', height: '200px' }} /> : '' }
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                    <form autoComplete= "off">
                        <Typography>Reference No.</Typography>
                        <TextField { ...register('transaction_no') } name= "transaction_no" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } fullWidth />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.transaction_no?.message }</Typography>
                    </form>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Gcash;