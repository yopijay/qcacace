// Libraries
import { Box, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

// Constants
import { activeLink, brand, greeting, link, swipe } from "./index.style"; // Styles

export const Index = () => {
    const { open, drawerToggle, container, setOpen, setIsActive, isActive } = useContext(GlobalCntxt);
    
    return (
        <Box sx= {{ display: 'flex', flexDirection: 'column', flexShrink: { xs: 0 }, height: '100vh' }}>
            <SwipeableDrawer anchor= "left" variant= "temporary" sx= { swipe } ModalProps= {{ keepMounted: true }} container= { container  } onOpen= { drawerToggle(true) } open= { open.left } onClose= { drawerToggle(false) }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 15px' }}>
                    <Typography sx= { greeting }>Hi! Welcome to</Typography>
                    <Typography sx= { brand }>QCACAC E-Services</Typography>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ padding: '40px 0' }}>
                        <Typography sx= { isActive === 'home' ? activeLink : link } component= { Link } to= "/" onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'home'); setIsActive('home'); } }>Home</Typography>
                        <Typography sx= { isActive === 'pets' ? activeLink : link } component= { Link } to= "/pets" onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'pets'); setIsActive('pets'); } }>Pet Gallery</Typography>
                        <Typography sx= { isActive === 'services' ? activeLink : link } component= { Link } to= "/services" onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'services'); setIsActive('services'); } }>Services</Typography>
                        <Typography sx= { isActive === 'faqs' ? activeLink : link } component= { Link } to= "/faqs" onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'faqs'); setIsActive('faqs'); } }>FAQs</Typography>
                    </Stack>
                </Stack>
            </SwipeableDrawer>
        </Box>
    );
}

export default Index;