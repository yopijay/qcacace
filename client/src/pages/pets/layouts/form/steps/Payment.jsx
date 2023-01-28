// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { payment } from "core/api/index.func"; // API
import { successToast, usePost } from "core/global/function/index.func"; // Function

// Layouts
import Gcash from "./payment/Gcash";
import Cash from "./payment/Cash";

// Constants
import { btntxt } from "../index.style";
const mthd = {
    border: 'solid 1px #1b4168', 
    borderRadius: '6px', 
    padding: '10px 17px',
    cursor: 'pointer'
}

const mthdactive = {
    backgroundColor: '#1b4168', 
    borderRadius: '6px', 
    padding: '10px 17px',
    cursor: 'pointer'
}

const Payment = () => {
    const { id, userid, adoptid } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, register, setValue, setError } = useContext(FormCntxt);
    const [ method, setMethod ] = useState('gcash');
    const { mutate: pay } = 
        usePost({ fetch: payment,
            onSuccess: (data) => {
                if(data.result === 'error') { setError(data.errors[0].name, { message: data.errors[0].message }); }
                else { successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${userid}/${adoptid}/finish`, { replace: true })); }
            }
        });

    useEffect(() => { register('payment', { value: method }); }, [ register, method ]);

    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 5 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                <Typography variant= "h5">Payment</Typography>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                    <Grid item xs= { 6 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } onClick= { () => { setMethod('gcash'); setValue('payment', 'gcash') } }
                            sx= { method === 'gcash' ? mthdactive : mthd }>
                            <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bold', color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>G-Cash</Typography>
                            <Typography variant= "caption" sx= {{ color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 6 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } onClick= { () => { setMethod('cash'); setValue('payment', 'cash') } }
                            sx= { method === 'cash' ? mthdactive : mthd }>
                            <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bold', color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>Cash</Typography>
                            <Typography variant= "caption" sx= {{ color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    { method === 'gcash' ? <Gcash /> : <Cash /> }
                </Stack>
            </Stack>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } component= { Link } to= { `/pets/${id}/adopt/${userid}/${adoptid}/appointment` }>Back</Box>
                </Grid>
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        data['info_id'] = atob(userid);
                        data['adopt_id'] = atob(adoptid);
                        if(data.payment === 'gcash' && data.transaction_no === '') { setError('transaction_no', { message: 'This field is required!' }); }
                        else { pay(data) }
                    })}>Next</Box>
                </Grid>
            </Grid> 
        </Stack>
    );
}

export default Payment;