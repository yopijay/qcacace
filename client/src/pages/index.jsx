// Libraries
import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Layouts
import Navbar from './global/navbar';
import Main from './main';

// Custom styles
const content = {
    justifyContent: 'flex-start,',
    alignItems: 'flex-start',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
}

const Index = () => {
    return (
        <Box display= "flex">
            <Navbar />
            <Container maxWidth= "lg">
                <Box sx= { content }>
                    <Routes>
                        <Route exact path= "/*" element= { <Main /> } />
                        <Route exact path= "/pets/*" element= { "PETS" } />
                        <Route exact path= "/services/*" element= { "SERVICES" } />
                    </Routes>
                </Box>
            </Container>
        </Box>
    );
}

export default Index;