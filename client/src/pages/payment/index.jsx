// Libraries
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Core
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { payment, specific } from "core/api/index.func"; // API
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import BG from 'assets/images/section.jpg'; // Assets
import { btntxt, mthd, mthdactive } from "./index.style"; // Styles

// Layouts
import PetInfo from "./layouts/PetInfo";
import Gcash from "./layouts/Gcash";
import Cash from "./layouts/Cash";

// Custom styles
const card = {
    padding: '30px 15px',
    flexGrow: 1,
    backgroundImage: `url(${BG})`,
    borderRadius: '8px',
    border: 'solid 1px #919eab40',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ method, setMethod ] = useState('gcash');
    const { handleSubmit, register, setValue, setError } = useContext(FormCntxt);
    const { data: srvc } = useGet({ key: ['srvc_specific'], fetch: specific({ table: 'tbl_services', id: id }) });
    const { mutate: pay } = 
        usePost({ fetch: payment, 
            onSuccess: data => {
                if(data.result === 'error') { setError(data.errors[0].name, { message: data.errors[0].message }); }
                else { successToast(data.message, 3000, navigate(`/`, { replace: true })); }
            } 
        });

    useEffect(() => { register('payment', { value: method }); }, [ register, method ]);

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 5 } sx= {{ width: '100%', height: '100vh', padding: '10px' }}>
                <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                    <Grid item xs= { 12 }>
                        <Box sx= { card }>
                            <Grid container direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start', md: 'space-evenly' }} alignItems= "stretch" spacing= { 5 }>
                                <Grid item xs= { 12 } md= { 4 } lg= { 3 }><PetInfo data= { srvc } /></Grid>
                                <Grid item xs= { 12 } md= { 6 } lg= { 5 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ marginBottom: '30px' }}>
                                        <Typography variant= "h5">Payment</Typography>
                                        { srvc?.[0]?.type !== 'surrender' ? 
                                            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                                <Grid item xs= { 6 }>
                                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } 
                                                        onClick= { () => { setMethod('gcash'); setValue('payment', 'gcash') } }
                                                        sx= { method === 'gcash' ? mthdactive : mthd }>
                                                        <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bold', color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>G-Cash</Typography>
                                                        <Typography variant= "caption" sx= {{ color: method === 'gcash' ? '#FFFFFF' : '#1b4168' }}>
                                                            Gcash is a mobile wallet and mobile payment </Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs= { 6 }>
                                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } 
                                                        onClick= { () => { setMethod('cash'); setValue('payment', 'cash') } }
                                                        sx= { method === 'cash' ? mthdactive : mthd }>
                                                        <Typography variant= "h6" sx= {{ fontFamily: 'Tommy Bold', color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>Cash</Typography>
                                                        <Typography variant= "caption" sx= {{ color: method === 'cash' ? '#FFFFFF' : '#1b4168' }}>
                                                        You can pay with cash directly at the office. </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid> : '' }
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                            { method === 'gcash' ? <Gcash type= { srvc?.[0]?.type } /> : <Cash /> }
                                        </Stack>
                                    </Stack>
                                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                                        <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                                            <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                                                data['id'] = id;
                                                data['application_type'] = 'online';
                                                data['type'] = srvc?.[0]?.type;
                                                if(data.payment === 'gcash' && data.transaction_no === '') { setError('transaction_no', { message: 'This field is required!' }); }
                                                else { pay(data); }
                                            })}>Pay</Box>
                                        </Grid>
                                    </Grid> 
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

export default Index;