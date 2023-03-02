// Libraries
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

// Constants
import { btntxt, card } from "../../index.style"; // Styles
import Logo from "assets/images/logo.png"; // Assets

const Released = () => {
    const { id } = useParams();

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
            <Box sx= { card }>
                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 5 } sx= {{ height: '100%' }}>
                    <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 2 } sx= {{ height: '100%' }}>
                        <Avatar src= { Logo } sx= {{ width: 160, height: 160 }} />
                        <Typography variant= "h4">Thank You!</Typography>
                        {/* <Typography sx= {{ textAlign: 'center' }}>Your application was successfully submitted.
                            Please check your email inbox for the updates of your application.</Typography> */}
                    </Stack>
                </Stack>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/payment/${id}` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= "/tools/adopt">Done</Box></Grid>
            </Grid>
        </Stack>
    );
}

export default Released;