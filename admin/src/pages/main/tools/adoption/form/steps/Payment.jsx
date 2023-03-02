// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { payment, specific } from "core/api/index.func"; // API
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function

// Layouts
import Gcash from "./payment/Gcash";
import Cash from "./payment/Cash";

// Constants
import { btntxt, card, mthd, mthdactive } from "../../index.style"; // Styles

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ method, setMethod ] = useState('gcash');
    const { handleSubmit, setError, setValue, register, getValues } = useContext(FormCntxt);
    useGet({ key: ['srvc_specific'], fetch: specific({ table: 'tbl_services', id: id !== undefined ? atob(id) : null }), options: { enabled: true, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count]; 
                        setValue(_name, data[0][_name] !== null ? data[0][_name] : '');
                    } 
                } 
            }
        });

    const { mutate: pay } = 
        usePost({ fetch: payment,
            onSuccess: data => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate(`/tools/adopt/released/${btoa(data.id)}`, { replace: true })); }
            }
        });
    
    useEffect(() => { setMethod(getValues().transaction_no !== '' ? 'gcash' : 'cash'); setValue('payment', method) }, [ getValues, setValue, method ]);
    useEffect(() => { register('payment', { value: method }); }, [ register, method ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px', color: '#142F48' }}>Payment</Typography>
                        <Box>
                            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                <Grid item xs= { 6 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }
                                        onClick= { () => { setMethod('gcash'); setValue('payment', 'gcash') } }
                                        sx= { method === 'gcash' ? mthdactive : mthd }>
                                        <Typography variant= "h6" sx= {{ color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>G-Cash</Typography>
                                        <Typography variant= "caption" sx= {{ color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>
                                            Gcash is a mobile wallet and mobile payment </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs= { 6 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } 
                                        onClick= { () => { setMethod('cash'); setValue('payment', 'cash') } }
                                        sx= { method === 'cash' ? mthdactive : mthd }>
                                        <Typography variant= "h6" sx= {{ color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>Cash</Typography>
                                        <Typography variant= "caption" sx= {{ color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>
                                        You can pay with cash directly at the office. </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">{ method === 'gcash' ? <Gcash /> : <Cash /> }</Stack>
                    </Stack>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/documentary-requirement/${id}` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        data['application_type'] = 'walk-in';
                        data['id'] = atob(id);
                        data['evaluated_by'] = atob(localStorage.getItem('token'));

                        if(data.payment === 'gcash' && data.transaction_no === '') { setError('transaction_no', { message: 'This field is required!' }); }
                        else { pay(data) }
                    }) }>Next</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Payment;