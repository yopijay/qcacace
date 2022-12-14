// Libraries
import { Dialog, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

// Core
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider

// Layouts
import Recommended from './recommended';
import List from './list';
import Footer from '../global/footer';
import PreferForm from './dialog/recommendation';

// Constants
import { container } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ open, setOpen ] = useState(localStorage.getItem('recommend') === null);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            { localStorage.getItem('recommend') !== null ? <Recommended /> : '' }
            <List />
            <Footer />
            <Dialog fullScreen= { fullscreen } open= { open } keepMounted onClose= { () => setOpen(false) } maxWidth= "sm" fullWidth= { true } disableEscapeKeyDown= { true }>
                <FormPrvdr><PreferForm setOpen= { setOpen } /></FormPrvdr>
            </Dialog>
        </Stack>
    );
}

export default Index;