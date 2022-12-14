// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Dialog, Grid, Stack, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Core
import { input } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { get, save, update } from "core/api/index.func"; // APIs

// Constants
import { btnicon, btntxt, card, title } from "./index.style"; // Styles 

// Layouts
import GeneralInformation from "./layouts/GeneralInformation";
import Documentary from "./layouts/Documentary";
import Applicant from "./layouts/Applicant";
import Pet from "./layouts/Pet";

// Custom style
const container = {
    padding: '90px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    const navigate = useNavigate();
    const { handleSubmit, setError } = useContext(FormCntxt);

    const { mutate: saving } = usePost(save, (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate(`/pets/adopt/status/${data.id}`, { replace: true })); localStorage.removeItem('adopt'); } });
    
    return (
        <Container maxWidth= "lg" sx= { container }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                <Stack direction= "row" justifyContent= "flex-end" alignItems= "center"><Typography sx= { title }>Adoption Form</Typography></Stack>
                <Box sx= { card }>
                    <form autoComplete= "off">
                        <Box sx= {{ borderBottom: 'dashed 1px #919eab73', padding: '40px 0' }}>
                            <GeneralInformation />
                        </Box>
                        <Box sx= {{ borderBottom: 'dashed 1px #919eab73', padding: '40px 0' }}>
                            <Typography gutterBottom sx= {{ fontWeight: 'bold', textTransform: 'uppercase', padding: { xs: '0 15px', sm: '0 35px' } }} variant= "body1">Documentary Requirements</Typography>
                            <Documentary />
                        </Box>
                        <Box sx= {{ borderBottom: 'dashed 1px #919eab73', padding: '40px 0' }}>
                            <Typography gutterBottom sx= {{ fontWeight: 'bold', textTransform: 'uppercase', padding: { xs: '0 15px', sm: '0 35px' } }} variant= "body1">Applicant Details</Typography>
                            <Applicant />
                        </Box>
                        <Box sx= {{ padding: '40px 0' }}>
                            <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ padding: { xs: '0 15px', sm: '0 35px' } }}>
                                <Typography gutterBottom sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} variant= "body1">Pet Details</Typography>
                            </Stack>
                            <ThemeProvider theme= { input }><Pet /></ThemeProvider>
                        </Box>
                    </form>
                </Box>
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ paddingBottom: '40px' }}>
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            if(data.document === undefined) { errorToast(`Please fill up your documentary requirements to proceed!`, 3000, navigate('/tools/adoption/form/apply', { replace: true })); }
                            else if(data.applicant.fname === '') { setError(`fname`, { message: 'This field is required!' }); }
                            else if(data.applicant.lname === '') { setError(`lname`, { message: 'This field is required!' }); }
                            else if(data.applicant.contact_no === '') { setError(`contact_no`, { message: 'This field is required!' }); }
                            else if(data.applicant.email === '') { setError(`email`, { message: 'This field is required!' }); }
                            else { saving({ table: 'tbl_adopt', type: 'save', data: data }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

export default Index;