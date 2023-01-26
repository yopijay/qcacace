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
import Form from './layouts/form';

// Constants
import { container } from "./index.style"; // Styles
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ dialog, setDialog ] = useState(localStorage.getItem('recommend') === null);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Routes>
                <Route exact path= "/" element= {
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                        <ListPrvdr><List setDialog= { setDialog } /></ListPrvdr>
                        <FormPrvdr><Adopt dialog= { dialog } setDialog= { setDialog } /></FormPrvdr>
                    </Stack>
                } />
                <Route exact path= "/:id/adopt/*" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
            <Footer />
        </Stack>
    );
}

export default Index;