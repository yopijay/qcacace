// Libraries
import { Dialog, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

// Layouts
import Recommended from './recommended';
import List from './list';
import Footer from '../global/footer';
import PreferForm from './dialog';

// Constants
import { container } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ open, setOpen ] = useState(true);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Recommended />
            <List />
            <Footer />
            <Dialog fullScreen= { fullscreen } open= { open } keepMounted onClose= { () => setOpen(false) } maxWidth= "sm" fullWidth= { true } disableEscapeKeyDown= { true }>
                <PreferForm setOpen= { setOpen } />
            </Dialog>
        </Stack>
    );
}

export default Index;