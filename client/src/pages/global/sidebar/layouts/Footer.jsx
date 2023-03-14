// Libraires
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Stack, Typography } from "@mui/material";

// Assets
import Logo from 'assets/images/logo.png';

// Custom styles
export const brand = {
    letterSpacing: 1,
    color: '#204c6f'
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
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: { xs: '10px', lg: '90px 0 20px 0' } }}>
            <Stack direction= "row" justifyContent= "center" alignItems= "center" spacing= { 2 }>
                <Avatar src= { Logo } alt= "logo" sx= {{ width: 30, height: 30 }} />
                <Typography sx= { brand }>QCACAC E - Services</Typography>
            </Stack>
        </Stack>
    );
}

export  default Footer;