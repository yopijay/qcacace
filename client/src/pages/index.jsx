// Libraries
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
// import { FormPrvdr } from "core/context/FormCntxt.func"; // Context

// Layouts
import Navbar from './global/navbar';
import Sidebar from './global/sidebar';
import Main from './main';
import Pets from './pets';
// import AdoptPets from './adopt';
// import AdoptStatus from './status';

// Custom styles
const content = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start,',
    alignItems: 'stretch',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
}

const Index = () => {

    return (
        <Box display= "flex">
            <Navbar />
            <Sidebar />
            <Box sx= { content }>
                <Routes>
                    <Route exact path= "/*" element= { <Main /> } />
                    <Route exact path= "/pets/*" element= { <Pets /> } />
                    {/* <Route exact path= "/pets/adopt/form" element= { <FormPrvdr><AdoptPets /></FormPrvdr> } />
                    <Route exact path= "/pets/adopt/status/:id" element= { <FormPrvdr><AdoptStatus /></FormPrvdr> } />
                    <Route exact path= "/services/*" element= { "SERVICES" } />
                    <Route exact path= "/faqs/*" element= { "FAQs" } /> */}
                </Routes>
            </Box>
        </Box>
    );
}

export default Index;