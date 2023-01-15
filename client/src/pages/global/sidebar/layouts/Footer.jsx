// Libraires
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Stack, Typography } from "@mui/material";

// Assets
import Logo from 'assets/images/logo.png';

// Custom styles
export const brand = {
    fontFamily: 'Tommy Bold',
    letterSpacing: 1,
    fontSize: { md: '115%' },
    color: '#ffffff'
}

export const brandinfo = {
    textAlign: 'justify',
    fontSize: { md: '105%' },
    color: '#ececec',
    padding: '10px 0 20px 0'
}

export const brandlinks = {
    fontSize: '150%',
    color: '#ffffff'
}

const Footer = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: { xs: '20px', lg: '90px 0 20px 0' }, backgroundColor: '#1B4168' }}>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                <Avatar src= { Logo } alt= "logo" sx= {{ width: 40, height: 40 }} />
                <Typography sx= { brand}>QCACAC E - Services</Typography>
            </Stack>
            <Typography sx= { brandinfo }>The Quezon City Animal Care and Adoption Center E-Services provides services that makes adoption, surrendering, and reporting missing animals easier. 
            It also provides information about Quezon City Animals including latest announcements to keep you updated. 
            Here in QC ACAC, we offer love and care to the animals!.</Typography>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook') } /></Typography>
                <Typography sx= { brandlinks }><FontAwesomeIcon icon= { brands('facebook-messenger') } /></Typography>
            </Stack>
        </Stack>
    );
}

export  default Footer;