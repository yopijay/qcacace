// Libraries
import { Avatar, Box, Popover, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

// Constants
import { activeLink, link, sidebar, swipe } from "./index.style"; // Styles
import { Nav } from "core/constants/Nav.const";

export const Index = () => {
    const { open, drawerToggle, container, setOpen, setIsActive, isActive } = useContext(GlobalCntxt);
    const [ elem, setElem ] = useState(null);
    const pop = Boolean(elem);
    const id = pop ? 'simple-popover' : undefined;
    
    return (
        <Box sx= {{ display: 'flex', flexDirection: 'column', width: { lg: 250 }, flexShrink: { xs: 0 }, height: '100vh' }}>
            <SwipeableDrawer anchor= "left" variant= "temporary" sx= { swipe } ModalProps= {{ keepMounted: true }} container= { container  } onOpen= { drawerToggle(true) } open= { open.left } onClose= { drawerToggle(false) }>
                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ padding: '20px 15px', height: '100%' }}>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                        {
                            Nav().map((item, index) => (
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" key= { index }>
                                    <Typography variant= "caption" sx= {{ textTransform: 'uppercase', fontFamily: 'Gilroy Bold', color: '#cfcfcf', padding: '10px 0' }}>{ item.title }</Typography>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                        { (item.nav).map((nav, index) => ( <Typography component= { Link } to= { nav.path } key= { index } sx= { isActive === nav.name ? activeLink : link } onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', nav.name); setIsActive(nav.name); }}>{ nav.label }</Typography> )) }
                                    </Stack>
                                </Stack>
                            ))
                        }
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        <Avatar sx= {{ width: 35, height: 35 }} />
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" flexGrow= "1">
                            <Typography variant= "body2">Juan Dela Cruz</Typography>
                            <Typography variant= "caption">Admin</Typography>
                        </Stack>
                        <Typography onClick= { e => { setElem(e.currentTarget) } }><FontAwesomeIcon icon= { solid('ellipsis-vertical') } /></Typography>
                    </Stack>
                </Stack>
            </SwipeableDrawer>
            <Box sx= { sidebar }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                    {
                        Nav().map((item, index) => (
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" key= { index }>
                                <Typography variant= "caption" sx= {{ textTransform: 'uppercase', fontFamily: 'Gilroy Bold', color: '#cfcfcf', padding: '10px 0' }}>{ item.title }</Typography>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    { (item.nav).map((nav, index) => ( <Typography component= { Link } to= { nav.path } key= { index } sx= { isActive === nav.name ? activeLink : link } onClick= { () => { localStorage.setItem('nav', nav.name); setIsActive(nav.name); }}>{ nav.label }</Typography> )) }
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                    <Avatar sx= {{ width: 35, height: 35 }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" flexGrow= "1">
                        <Typography variant= "body2">Juan Dela Cruz</Typography>
                        <Typography variant= "caption">Admin</Typography>
                    </Stack>
                    <Typography onClick= { e => { setElem(e.currentTarget) } }><FontAwesomeIcon icon= { solid('ellipsis-vertical') } /></Typography>
                </Stack>
            </Box>
            <Popover id= { id } open= { pop } anchorEl= { elem } onClose= { () => setElem(null) } anchorOrigin= {{ vertical: 'bottom', horizontal: 'right' }} transformOrigin= {{ vertical: 'bottom', horizontal: 'left' }} style= {{ marginTop: '7px', boxShadow: 'none', marginLeft: '15px' }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '200px', transition: 'all 0.2s ease-in-out' }}>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '10px 20px' }}>
                        <Typography variant= "body1" component= { Link } to= "/" sx= { link } onClick= { () => { setElem(null); localStorage.setItem('nav', 'home'); setIsActive('home'); } }>Dashboard</Typography>
                        <Typography variant= "body1" component= { Link } to= "" sx= { link } onClick= { () => { setElem(null); localStorage.setItem('nav', 'profile'); setIsActive('profile'); } }>Profile</Typography>
                        <Typography variant= "body1" component= { Link } to= "" sx= { link } onClick= { () => { setElem(null); localStorage.setItem('nav', 'settings'); setIsActive('settings'); } }>Settings</Typography>
                    </Stack>
                    <Box sx= {{ padding: '10px 20px' }}><Typography variant= "body1" onClick= { () => { localStorage.removeItem('token'); window.location.href= '/'; } } sx= { link }>Logout</Typography></Box>
                </Stack>
            </Popover>
        </Box>
    );
}

export default Index;