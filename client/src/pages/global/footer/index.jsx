// Libraries
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { save } from "core/api/index.func"; // APIs
import { successToast, usePost } from "core/global/function/index.func"; // Functions

// Constants
import Logo from 'assets/images/logo.png'; // Assets
import { brand, brandinfo, brandlinks, title, links, info, newsletter, btntxt } from "./index.style"; // Styles
import { validation } from "./index.validation"; // Validation

const Index = () => {
    const { setIsActive } = useContext(GlobalCntxt);
    const navigate = useNavigate();
    const { register, handleSubmit, errors, setError, setValidation, setValue } = useContext(FormCntxt);

    const { mutate: subscribe } = usePost({ fetch: save, 
        onSuccess: data => {
            if(data.result  === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
            else { setValue('email', ''); successToast(data.message, 3000, navigate(window.location.pathname, { replace: true })); }
        } });

    useEffect(() => { setValidation(validation()); }, [ setValidation ]);
    return (
        <Box sx= {{ backgroundColor: '#1B4168', padding: '70px 0' }}>
            <Container maxWidth= "lg">
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                    <Grid item xs= { 12 } md= { 6 } lg= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                                <Avatar src= { Logo } alt= "logo" sx= {{ width: 40, height: 40 }} />
                                <Typography sx= { brand }>QC ACAC E - Services</Typography>
                            </Stack>
                            <Typography sx= { brandinfo }>The Quezon City Animal Care and Adoption Center E-Services provides services that makes adoption, surrendering, and reporting missing animals easier. 
                                It also provides information about Quezon City Animals including latest announcements to keep you updated. 
                                Here in QC ACAC, we offer love and care to the animals!.</Typography>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook') } /></Typography>
                                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook-messenger') } /></Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 6 } lg= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                            <Typography sx= { links } component= { Link } to= "/" onClick= { () => { localStorage.setItem('nav', 'home'); setIsActive('home'); } }>Home</Typography>
                            <Typography sx= { links } component= { Link } to= "/pets" onClick= { () => { localStorage.setItem('nav', 'pets'); setIsActive('pets'); } }>Pet Gallery</Typography>
                            <Typography sx= { links } component= { Link } to= "/services/pet-program" onClick= { () => { localStorage.setItem('nav', 'services'); setIsActive('services'); } }>Services</Typography>
                            <Typography sx= { links } component= { Link } to= "/faqs" onClick= { () => { localStorage.setItem('nav', 'faqs'); setIsActive('faqs'); } }>FAQs</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 6 } lg= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                            <Typography sx= { title }>Contact Us</Typography>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                                <Typography sx= {{ color: '#ececec' }}><FontAwesomeIcon icon= { solid('phone') } /></Typography>
                                <Typography sx= {{ color: '#ececec', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>PH+ 6383594364</Typography>
                            </Stack> 
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                                <Typography sx= {{ color: '#ececec' }}><FontAwesomeIcon icon= { solid('envelope') } /></Typography>
                                <Typography sx= {{ color: '#ececec', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>qc.animalcareandadoption@gmail.com</Typography>
                            </Stack> 
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                                <Typography sx= {{ color: '#ececec' }}><FontAwesomeIcon icon= { solid('location-dot') } /></Typography>
                                <Typography sx= {{ color: '#ececec', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines</Typography>
                            </Stack> 
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 6 } lg= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= { title }>Newsletter</Typography>
                            <Typography sx= { info }>Want to know what we`re up to? Sign up for the newsletter.</Typography>
                            <form autoComplete = "off">
                                <Box sx= { newsletter }><TextField { ...register('email') } variant= "standard" size= "small" fullWidth= { true } InputProps= {{ disableUnderline: true }} /></Box>
                                <Typography variant= "body2" sx= {{ color: '#e84118', marginTop: '8px' }} gutterBottom>{ errors.email?.message }</Typography>
                                <Box sx= { btntxt } onClick= { handleSubmit(data => subscribe({ table: 'tbl_subscribers', data: data }) )}>Subscribe</Box>
                            </form>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Index;