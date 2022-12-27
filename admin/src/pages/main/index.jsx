// Libraries
import { Suspense, useContext } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
import { ProfileCntxt } from "core/context/ProfileCntxt.func"; // Context
// import { useGet } from "core/global/function/index.func"; // Custom react query
// import { profile } from "core/api/index.func"; // APIs
// import { LoaderScreen } from "core/global/layout/loader/Screen"; // Loader
// import { Nav } from "core/constants/Nav.const"; // Constants
// import { Component } from "core/global/layout/loader/Component"; // Loader

// Layouts
import Navbar from '../global/navbar';
// import Sidebar from '../global/sidebar';

const Index = () => {
    const { data, setData } = useContext(ProfileCntxt);
    // const { isLoading } = useGet(['profile'], profile({ table: 'tbl_users', query: atob(localStorage.getItem('token')) }), { refetchOnWindowFocuse: false }, (data) => setData(data[0]) );

    // if(isLoading) { return <LoaderScreen /> }

    return (
        <Box display= "flex">
            <Navbar />
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                    
                </Stack>
            </Container>
        </Box>
        // <Stack direciton= "column" justifyContent= "flex-start" alignItems= "stretch">
        //     <Navbar />
        //     <Container maxWidth= "lg">
        //         <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
        //             {/* <Sidebar /> */}
        //             {/* <Box sx= {{ justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: 1, height: '100vh', overflow: 'hidden' }}>
        //                 <Routes>{ Nav().map((item) => { return (item.nav).map((nav, index) => ( <Route exact path= { `${nav.path}/*` } key= { index } element= { <Suspense fallback= { <Component /> }>{ nav.component }</Suspense> } /> )) }) } </Routes>
        //             </Box> */}
        //         </Stack>
        //     </Container>
        // </Stack>
    )
}

export default Index;