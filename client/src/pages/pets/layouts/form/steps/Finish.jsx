// Libraries
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom";

// Constants
import { btntxt } from "../index.style"; // Style
import Logo from "assets/images/logo.png"; // Assets

const Finish = () => {
    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 5 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                <Avatar src= { Logo } sx= {{ width: 160, height: 160 }} />
                <Typography variant= "h4">Thank You!</Typography>
                <Typography sx= {{ textAlign: 'center' }}>Your application was successfully submitted.
                Please check your email inbox for the updates of your application.</Typography>
            </Stack>
            <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } component= { Link } to= "/pets">Finish</Box>
                </Grid>
            </Grid> 
        </Stack>
    );
}

export default Finish;