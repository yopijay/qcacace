// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Constants
import { caption, cardaddress, cardmessage, cardquote, cardtitle, subtitle, title } from "./index.style"; // Styles

// Assets
import Feedback1 from 'assets/images/feedback/feedback1.png';

const Index = () => {
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>Happy Moments</Typography>
                    <Typography sx= { title }>Inspirational Stories</Typography>
                    <Typography sx= { caption }>There are many happy stories of people after finding their best friends.</Typography>
                </Box>
            </Grid>
            <Grid item sx= {{ padding: '10px', marginTop: '50px' }}>
                <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 10 } md= { 8 } lg= { 7 } sx= {{ padding: '10px', boxShadow: 1, borderRadius: '30px' }}>
                        <Grid container direction= "row" justifyContent= "center" alignItems= "center">
                            <Grid item xs= { 12 } sm= { 5 } lg= { 4 }><img src= { Feedback1 } alt= "feedback" width= "100%" height= "auto" style= {{ borderRadius: '30px' }} /></Grid>
                            <Grid item xs= { 12 } sm= { 7 } lg= { 8 }>
                                <Stack direction= "column" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 30px' }}>
                                    <Typography sx= { cardquote }><FontAwesomeIcon icon= { solid('quote-left') } /></Typography>
                                    <Typography sx= { cardtitle }>Owner 1 & Pet 1</Typography>
                                    <Typography sx= { cardaddress }>Novaliches, Holycross</Typography>
                                    <Typography sx= { cardmessage }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus finibus magna. Nulla aliquet lacinia metus placerat tempor. 
                                        Pellentesque sed massa nec nisl suscipit euismod.</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;