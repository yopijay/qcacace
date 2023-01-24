// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

// Constants
import { btnback, card } from "./index.style"; // Styles

// Layouts
import PetInfo from "./PetInfo";
import PersonalInformation from "./steps/PersonalInformation";
import Registration from "./steps/Registration";
import Verifying from "./steps/Verifying";

const Index = () => {
    
    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                    <Typography sx= { btnback } component= { Link } to= "/pets"><FontAwesomeIcon icon= { solid('chevron-left') } /></Typography>
                </Stack>
                <Box sx= { card }>
                    <Grid container direction= "row" justifyContent= {{ xs: 'center', sm: 'flex-start', md: 'space-evenly' }} alignItems= {{ xs: 'flex-start', sm: 'center' }} spacing= { 2 } sx= {{ padding: '20px' }}>
                        <Grid item xs= { 12 } sm= { 4 } md= { 3 } lg= { 3 } sx= {{ display: { xs: 'none', sm: 'block' } }}><PetInfo /></Grid>
                        <Grid item xs= { 12 } sm= { 8 } md= { 6 } lg= { 5 }>
                            <Routes>
                                <Route exact path= "/" element= { <Registration /> } />
                                <Route exact path= "/:userid/verifying" element= { <Verifying /> } />
                                <Route exact path= "/:userid/personal-information" element= { <PersonalInformation /> } />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Container>
    );
}

export default Index;