// Libraries
import { AppBar, Avatar, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func";

// Assets
import Logo from 'assets/images/logo.png';

// Custom styles
const appbar = {
    boxShadow: 'none',
    padding: '7px 0',
    maxHeight: '120px',
    overflow: 'hidden',
    backgroundColor: '#1B4168'
}

const Index = () => {
    const { drawerToggle, open, setIsActive } = useContext(GlobalCntxt);

    return (
        <AppBar position= "fixed" sx= { appbar }>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                    <Stack component= { Link } to= "/" direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ textDecoration: 'none' }} onClick= { () => { localStorage.setItem('nav', 'home'); setIsActive('home'); } }>
                        <Avatar alt= "QCACAC" src= { Logo } sx= {{ width: 35, height: 35 }} />
                        <Typography variant= "h5" sx= {{ fontFamily: 'Gilroy Bold', color: '#ffffff' }}>QC ACAC E - Services</Typography>
                    </Stack>
                    <Typography sx= {{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' }, display: { xs: 'block', lg: 'none' } }} onClick= { drawerToggle(!open.left) }><FontAwesomeIcon icon= { solid('bars-staggered') } /></Typography>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Index;