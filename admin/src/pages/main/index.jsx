// Libraries
import { Suspense, useContext } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
import { ProfileCntxt } from "core/context/ProfileCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { profile } from "core/api/index.func"; // APIs
import { LoaderScreen } from "core/global/layout/loader/Screen"; // Loader
import { Navs as components } from "core/constants/Navs"; // Navs

// Layouts
import Navbar from '../global/navbar';
import Sidebar from '../global/sidebar';

const Index = () => {
    const { setData } = useContext(ProfileCntxt);
    const { isLoading } = useGet({ key: ['profile'], fetch: profile(atob(localStorage.getItem('token'))), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setData(data[0]) });

    if(isLoading) { return <LoaderScreen /> }

    return (
        <Box display= "flex">
            <Navbar />
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                    <Sidebar />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100vh', padding: { xs: '70px 0 0 0', lg: '90px 10px 0 10px' } }}>
                        <Routes>{ components().map(ctgy => { return (ctgy.nav).map((layout, index) => ( <Route exact path= { `${layout.path}/*` } key= { index } element= { <Suspense fallback= { <LoaderScreen /> }>{ layout.component }</Suspense> } /> )) }) }</Routes>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default Index;