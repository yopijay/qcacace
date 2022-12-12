// Libraries
import { AppBar, Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
// import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func";

// Constants
import { activeLink, appbar, burger, link, notification } from "./index.style"; // Design

// Assets
import Logo from 'assets/images/logo.png';

const Index = () => {
    const { drawerToggle, open, setIsActive } = useContext(GlobalCntxt);

    return (
        <AppBar position= "fixed" sx= { appbar }>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } component= { Link } to= "/" onClick= { () => { localStorage.setItem('nav', 'home'); setIsActive('home'); } }><Avatar alt= "QCACAC" src= { Logo } sx= {{ width: 40, height: 40 }} /></Stack>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 2 }>
                        <Typography sx= { notification }><FontAwesomeIcon icon= { solid('bell') } /></Typography>
                        <Typography sx= { burger } onClick= { drawerToggle(!open.left) }><FontAwesomeIcon icon= { solid('bars') } /></Typography>
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Index;