// Libraries
import { Box, SwipeableDrawer } from "@mui/material";
import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

export const Index = () => {
    const { open, drawerToggle, container, setOpen } = useContext(GlobalCntxt);

    return (
        <Box sx= {{ display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh' }}>
            <SwipeableDrawer anchor= "right" variant= "temporary" ModalProps= {{ keepMounted: true }} container= { container } onOpen= { drawerToggle(true) } open= { open.right } onClose= { drawerToggle(false) }>
                
            </SwipeableDrawer> 
        </Box>
    );
}

export default Index;