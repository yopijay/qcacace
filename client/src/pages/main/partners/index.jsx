// Libraries
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Assets
import ACAC from 'assets/images/logo.png';
import QCGovernment from 'assets/images/partners/qcgovernment.png';
import Veterinary from 'assets/images/partners/veterinary.png';
import AnimalPound from 'assets/images/partners/animalpound.png';

// Custom design
// const container = {
//     borderRadius: '5px',
//     boxShadow: 2,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     overflow: 'hidden',
//     height: '150px'
// }

const Index = () => {
    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '10px 0' }}>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: { xs: '20px 0', md: '20px 40px'} }}>
                    <Avatar alt= "logo" src= { ACAC } sx= {{ width: 56, height: 56 }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold' }}>Quezon City Animal Care and Adoption Center</Typography>
                        <Typography variant= "body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sollicitudin urna, et porttitor tellus. Aliquam erat volutpat. Aenean maximus nibh non mi faucibus imperdiet. Maecenas rutrum nisi sit amet orci placerat tincidunt id vel augue.</Typography>
                        <Box display= "flex" justifyContent= "flex-end" alignItems= "flex-end">
                            <Typography variant= "body1" component= { Link } to= "https://www.facebook.com/animalcareandadoptioncenter/" target= "_blank" sx= {{ padding: '7px 35px', backgroundColor: '#1b4168', textDecoration: 'none', color: '#ffffff', borderRadius: '5px' }}>Visit</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: { xs: '20px 0', md: '20px 40px'} }}>
                    <Avatar alt= "logo" src= { QCGovernment } sx= {{ width: 56, height: 56 }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold' }}>Quezon City Government</Typography>
                        <Typography variant= "body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sollicitudin urna, et porttitor tellus. Aliquam erat volutpat. Aenean maximus nibh non mi faucibus imperdiet. Maecenas rutrum nisi sit amet orci placerat tincidunt id vel augue.</Typography>
                        <Box display= "flex" justifyContent= "flex-end" alignItems= "flex-end">
                            <Typography variant= "body1" component= { Link } to= "https://www.facebook.com/animalcareandadoptioncenter/" target= "_blank" sx= {{ padding: '7px 35px', backgroundColor: '#1b4168', textDecoration: 'none', color: '#ffffff', borderRadius: '5px' }}>Visit</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: { xs: '20px 0', md: '20px 40px'} }}>
                    <Avatar alt= "logo" src= { Veterinary } sx= {{ width: 56, height: 56 }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold' }}>Quezon City Veterinary Department</Typography>
                        <Typography variant= "body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sollicitudin urna, et porttitor tellus. Aliquam erat volutpat. Aenean maximus nibh non mi faucibus imperdiet. Maecenas rutrum nisi sit amet orci placerat tincidunt id vel augue.</Typography>
                        <Box display= "flex" justifyContent= "flex-end" alignItems= "flex-end">
                            <Typography variant= "body1" component= { Link } to= "https://www.facebook.com/animalcareandadoptioncenter/" target= "_blank" sx= {{ padding: '7px 35px', backgroundColor: '#1b4168', textDecoration: 'none', color: '#ffffff', borderRadius: '5px' }}>Visit</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 } sx= {{ padding: { xs: '20px 0', md: '20px 40px'} }}>
                    <Avatar alt= "logo" src= { AnimalPound } sx= {{ width: 56, height: 56 }} />
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold' }}>Quezon City Animal Pound</Typography>
                        <Typography variant= "body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis sollicitudin urna, et porttitor tellus. Aliquam erat volutpat. Aenean maximus nibh non mi faucibus imperdiet. Maecenas rutrum nisi sit amet orci placerat tincidunt id vel augue.</Typography>
                        <Box display= "flex" justifyContent= "flex-end" alignItems= "flex-end">
                            <Typography variant= "body1" component= { Link } to= "https://www.facebook.com/animalcareandadoptioncenter/" target= "_blank" sx= {{ padding: '7px 35px', backgroundColor: '#1b4168', textDecoration: 'none', color: '#ffffff', borderRadius: '5px' }}>Visit</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Index;