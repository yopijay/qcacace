// Libraries
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import QR from "assets/images/qr.jpg"; // Assets
import { input } from "./index.styles"; // Styles

const Gcash = ({ type }) => {
    const { register, errors, control } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography sx={{ fontWeight:'600', color:'black'}}><b>Instruction:</b></Typography>
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- On your Gcash app, Tap View All</Typography> : '' }
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- Tap QR, Tap SCan QR</Typography> : '' }
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- Align your phone's camera to the store's QR code to scan it. Make sure the QR code
                            is within frame.</Typography> : '' }
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- Input the total amount to be paid and tap NEXT.</Typography> : '' }
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- Review all details then tap Pay</Typography> : '' }
            { type !== 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>- You will see your in-app receipt on screen as well as receive an SMS receipt to confirm your transaction.</Typography> : '' }
            { type === 'surrender' ? <Typography sx={{ fontWeight:'600', color:'black'}}>You may settle your payment at the Quezon City Treasurer's Office located at Annex Building, QC Hall Mayaman St., Brgy. Central, Diliman, Quezon City. Please go to the counter where a staff member will assist you with your payment. </Typography> : '' }
            { type === 'surrender' ? <Typography sx={{ fontWeight:'600', color: 'black'}}>After that, you can input the payment reference number here for us to validate it.</Typography> : '' }
            <Typography sx={{ fontWeight:'600', color: 'black'}}>FEE: 500 Php</Typography>
            <Typography sx={{ fontWeight:'600', color:'black'}}>PS: This is non-refundable, please be careful before sending.</Typography>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>  
                { type !== 'surrender' ? <Avatar variant= "rounded" src= { QR } sx= {{ width: '200px', height: '200px' }} /> : '' }
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                    <form autoComplete= "off">
                        <Typography sx={{ fontWeight:'600', color:'black'}}>Reference No.</Typography>
                        <TextField { ...register('transaction_no') } name= "transaction_no" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } fullWidth />
                        <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.transaction_no?.message }</Typography>
                    </form>
                </Stack>
                { type === 'surrender' ? 
                    <Controller control= { control } name= "payment_date"
                        render= { ({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter= { AdapterDayjs }>
                                <DatePicker 
                                    value= { value }
                                    textField= { (params) => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                    onChange= { e => { onChange(`${dayjs(e).year()}-${dayjs(e).month() + 1}-${dayjs(e).date()}`); } } />
                            </LocalizationProvider>
                        ) }>
                    </Controller> : '' }
            </Stack>
        </Stack>
    );
}

export default Gcash;