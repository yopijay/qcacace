// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Dialog, Grid, Stack, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Core
import { input } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Custom react query
import { get, save, update } from "core/api/index.func"; // APIs

// Constants
import { btnicon, btntxt, card, title } from "./index.style"; // Styles 
import { validation } from "./index.validation"; // Validation

// Layouts
import GeneralInformation from "./layouts/GeneralInformation";
import Documentary from "./layouts/Documentary";
import Applicant from "./layouts/Applicant";
import Pet from "./layouts/Pet";
import Scanner from './dialog';

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { setValidation, handleSubmit, setValue, setError, getValues } = useContext(FormCntxt);
    const { refetch } = useGet(['adpt_specific'], get({ table: 'tbl_adopt', type: 'specific', query: id ?? null }), { enabled: type !== 'apply', refetchOnWindowFocus: false }, 
        (data) => { if(Array.isArray(data)) { for(let count = 0; count < Object.keys(data[0]).length; count++) { let _name = Object.keys(data[0])[count]; setValue(_name, data[0][_name] !== null ? data[0][_name] : ''); } } });

    const { mutate: saving } = usePost(save, (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/tools/adoption', { replace: true })); } });
    const { mutate: updating } = usePost(update, (data) => { if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); } else { successToast(data.message, 3000, navigate('/tools/adoption', { replace: true })); } });

    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography sx= { btnicon } component= { Link } to= "/tools/adoption" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
                <Typography sx= { title }>Adoption Form ({ type })</Typography>
            </Stack>
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
                            <Typography sx= { btnicon } onClick= { () => setOpen(true) }><FontAwesomeIcon icon= { solid('camera') } style= {{ color: '#ffffff' }} /></Typography>
                        </Stack>
                        <ThemeProvider theme= { input }><Pet /></ThemeProvider>
                    </Box>
                </form>
            </Box>
            { type !== 'view' && getValues()?.status !== 'done' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'apply' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));

                            if(type === 'apply') {
                                if(data.document === undefined) { errorToast(`Please fill up your documentary requirements to proceed!`, 3000, navigate('/tools/adoption/form/apply', { replace: true })); }
                                else if(data.applicant.fname === '') { setError(`fname`, { message: 'This field is required!' }); }
                                else if(data.applicant.lname === '') { setError(`lname`, { message: 'This field is required!' }); }
                                else if(data.applicant.contact_no === '') { setError(`contact_no`, { message: 'This field is required!' }); }
                                else if(data.applicant.email === '') { setError(`email`, { message: 'This field is required!' }); }
                                else { saving({ table: 'tbl_adopt', type: 'save', data: data }); }
                            }
                            else { updating({ table: 'tbl_adopt', type: 'update', query: id, data: data }); }
                        }) }>{ getValues()?.status === 'evaluation' ? 'Proceed to interview' : getValues()?.status === 'interview' ? 'Proceed to payment' : getValues()?.status === 'payment' ? 'Paid' : getValues()?.status === 'paid' ? 'Done' : 'Save' }</Box>
                    </Grid>
                </Grid> : '' }
            <Dialog fullScreen= { fullscreen } open= { open } keepMounted onClose= { () => setOpen(false) } maxWidth= "sm" fullWidth= { true } disableEscapeKeyDown= { true }>
                <Scanner setValue= { setValue } setOpen= { setOpen } />
            </Dialog>
        </Stack>
    );
}

export default Index;