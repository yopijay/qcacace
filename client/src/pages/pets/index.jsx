// Libraries
import { Stack, ThemeProvider } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { input } from "core/global/theme/index.style"; // Theme
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider

// Layouts
import List from './layouts/list';
import Adopt from './layouts/dialog';
import Footer from '../global/footer';

// Constants
import { container } from "./index.style"; // Styles
import { useState } from "react";

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ dialog, setDialog ] = useState(localStorage.getItem('recommend') === null);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <ThemeProvider theme= { input }><ListPrvdr><List setDialog= { setDialog } /></ListPrvdr></ThemeProvider>
            <FormPrvdr><Adopt dialog= { dialog } setDialog= { setDialog } /></FormPrvdr>
            <Footer />
        </Stack>
    );
}

export default Index;