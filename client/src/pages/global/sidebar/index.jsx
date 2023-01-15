// Libraries
import { Stack, SwipeableDrawer } from "@mui/material";
import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

// Constants
import { swipe } from "./index.style"; // Styles

// Layouts
import Navs from "./layouts/Navs";
import Footer from "./layouts/Footer";

export const Index = () => {
    const { open, drawerToggle, container } = useContext(GlobalCntxt);
    
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexShrink: { xs: 0 } }}>
            <SwipeableDrawer anchor= "left" variant= "temporary" sx= { swipe } ModalProps= {{ keepMounted: true }} container= { container } onOpen= { drawerToggle(true) } open= { open.left } onClose= { drawerToggle(false) }>
                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ height: '100vh' }} spacing= { 2 }>
                    <Navs />
                    <Footer />
                </Stack>
            </SwipeableDrawer>
        </Stack>
    );
}

export default Index;