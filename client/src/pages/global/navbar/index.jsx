// Libraries
import { AppBar, Avatar, Container, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
// import { useContext } from "react";

// Core
// import { GlobalCntxt } from "core/context/GlobalCntxt.func";

// Constants
import { activeLink, appbar, link } from "./index.style"; // Design

// Assets
import Logo from 'assets/images/logo.png';

const Index = () => {
    // const { drawerToggle, open } = useContext(GlobalCntxt);

    return (
        <AppBar position= "fixed" sx= { appbar }>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } component= { Link } to= "/">
                        <Avatar alt= "QCACAC" src= { Logo } sx= {{ width: 45, height: 45 }} />
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 4 }>
                        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 } sx= { activeLink } component= { Link } to= "/">
                            <Typography sx= {{ display: { xs: 'block', sm: 'none' } }}><FontAwesomeIcon icon= { solid('house') } /></Typography>
                            <Typography variant= "body2" sx= {{ display: { xs: 'none', sm: 'block' } }}>Home</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 } sx= { link } component= { Link } to= "/pets">
                            <Typography sx= {{ display: { xs: 'block', sm: 'none' } }}><FontAwesomeIcon icon= { solid('paw') } /></Typography>
                            <Typography variant= "body2" sx= {{ display: { xs: 'none', sm: 'block' } }}>Pets</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 } sx= { link } component= { Link } to= "/services">
                            <Typography sx= {{ display: { xs: 'block', sm: 'none' } }}><FontAwesomeIcon icon= { solid('gear') } /></Typography>
                            <Typography variant= "body2" sx= {{ display: { xs: 'none', sm: 'block' } }}>Services</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Index;