// Libraries
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Layouts
import Navbar from './global/navbar';
import Sidebar from './global/sidebar';
import Main from './main';

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
    localStorage.setItem('nav', 'home');
    
    return (
        <Box display= "flex">
            <Navbar />
            <Sidebar />
            <Box sx= { content }> 
                <Routes>
                    <Route exact path= "/*" element= { <Main /> } />
                    <Route exact path= "/pets/*" element= { "PETS" } />
                    <Route exact path= "/services/*" element= { "SERVICES" } />
                    <Route exact path= "/faqs/*" element= { "FAQs" } />
                </Routes>
            </Box>
        </Box>
    );
}

export default Index;