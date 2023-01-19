// Libraries
import { Stack, ThemeProvider } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { FormProvider } from "react-hook-form"; // Provider
import { input } from "core/global/theme/index.style"; // Theme

// Layouts
import List from './layouts/list';
import Adopt from './layouts/dialog';
import Footer from '../global/footer';

// Constants
import { container } from "./index.style"; // Styles
import { useState } from "react";

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ dialog, setDialog ] = useState(false);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <ThemeProvider theme= { input }><ListPrvdr><List setDialog= { setDialog } /></ListPrvdr></ThemeProvider>
            <FormProvider><Adopt dialog= { dialog } setDialog= { setDialog } /></FormProvider>
            <Footer />
        </Stack>
    );
}

export default Index;