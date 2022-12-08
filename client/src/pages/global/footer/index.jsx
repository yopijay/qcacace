// Libraries
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";

// Assets
import Logo from 'assets/images/logo.png';

// Constants
import { brand, brandinfo, brandlinks, title, links, info, newsletter } from "./index.style"; // Styles

const Index = () => {
    return (
        <Box sx= {{ backgroundColor: '#371313', padding: '70px 0' }}>
            <Container maxWidth= "lg">
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                    <Grid item xs= { 12 } md= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                                <Avatar src= { Logo } alt= "logo" sx= {{ width: 40, height: 40 }} />
                                <Typography sx= { brand }>QCACAC</Typography>
                            </Stack>
                            <Typography sx= { brandinfo }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis, lectus id viverra fermentum, eros libero aliquam nisl, ac lacinia ex turpis eu arcu. </Typography>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook') } /></Typography>
                                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook-messenger') } /></Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                            <Typography sx= { links }>Home</Typography>
                            <Typography sx= { links }>Pet Gallery</Typography>
                            <Typography sx= { links }>Services</Typography>
                            <Typography sx= { links }>FAQs</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
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
                                <Typography sx= {{ color: '#ececec', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines</Typography>
                            </Stack> 
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 3 } sx= {{ padding: { xs: '15px 0', md: '0 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= { title }>Newsletter</Typography>
                            <Typography sx= { info }>Want to know what we`re up to? Sign up for the newsletter.</Typography>
                            <form autoComplete = "off"><Box sx= { newsletter }><TextField variant= "standard" size= "small" fullWidth= { true } InputProps= {{ disableUnderline: true }} /></Box></form>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Index;