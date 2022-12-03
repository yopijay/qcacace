// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <Grid container direction= "column" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '30px 0' }}>
            <Grid item>
                <Stack direction= "row" justifyContent= "center" alignItems= "center" spacing= { 1 }>
                    <Typography variant= "h5" sx= {{ fontWeight: 'bold', color: '#64a93e', textTransform: 'uppercase' }}>Our</Typography>
                    <Typography variant= "h5" sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}>Services</Typography>
                </Stack>
            </Grid>
            <Grid item sx= {{ padding: '20px 0' }}>
                <Grid container direction= "row" justifyContent= "center" alignItems= "center" spacing= { 2 }>
                    <Grid item xs= { 12 } md= { 4 } sx= {{ padding: '2px' }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 25px', boxShadow: 1, borderRadius: '7px', minHeight: '360px' }}>
                            <Typography variant= "button" sx= {{ fontWeight: 'bold', fontSize: '110%', color: '#1b4168' }}>Adopt Pets</Typography>
                            <Typography variant= "body1"><span style= {{ fontWeight: 'bold' }}>Don't Shop. Adopt.</span> QC Animal Care And Adoption Center Are Encouraging Pet Owners To Adopt Pets Who Are Looking For A New Family Or A Friend. 
                                Give A Chance To The Pet To Be Your Companion, Bestfriend Or Even A Fur Baby! Share Your Love And Support To Our Pets By Sliding Learn More.</Typography>
                            <Box display= "flex" flexDirection= "row" justifyContent= "flex-end" alignItems= "center">
                                <Typography component= { Link } to= "/" variant= "body1" sx= {{ textDecoration: 'none', backgroundColor: '#1b4168', color: '#ffffff', padding: '7px 15px', borderRadius: '20px' }}>View more</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 4 } sx= {{ padding: '2px' }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 25px', boxShadow: 1, borderRadius: '7px', minHeight: '360px' }}>
                            <Typography variant= "button" sx= {{ fontWeight: 'bold', fontSize: '110%', color: '#1b4168' }}>Surrender Pets</Typography>
                            <Typography variant= "body1">A Pet Deserves To Have A Home Where They Can Feel Safe And Loved. Remember That We Are Not Encouraging The Pet Owners To Surrender Their Pets To Our Shelter But If You Have No Other Choice, 
                                We Will Always Welcome Them With A Big Hug And Small Kisses.</Typography>
                            <Box display= "flex" flexDirection= "row" justifyContent= "flex-end" alignItems= "center">
                                <Typography component= { Link } to= "/" variant= "body1" sx= {{ textDecoration: 'none', backgroundColor: '#1b4168', color: '#ffffff', padding: '7px 15px', borderRadius: '20px' }}>View more</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 4 } sx= {{ padding: '2px' }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 25px', boxShadow: 1, borderRadius: '7px', minHeight: '360px' }}>
                            <Typography variant= "button" sx= {{ fontWeight: 'bold', fontSize: '110%', color: '#1b4168' }}>Missing Pets</Typography>
                            <Typography variant= "body1">Our Pet Is One Of Our Family Members And Being Away From Them Is An Awful Feeling. We At QC Animal Care And Adoption Center Are Willing To Help The Pet Owners To Find Their Fur Baby. 
                                Let's All Help The Pet To Find Their Way Back To Their Home.</Typography>
                            <Box display= "flex" flexDirection= "row" justifyContent= "flex-end" alignItems= "center">
                                <Typography component= { Link } to= "/" variant= "body1" sx= {{ textDecoration: 'none', backgroundColor: '#1b4168', color: '#ffffff', padding: '7px 15px', borderRadius: '20px' }}>View more</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction= "row" justifyContent= "center" alignItems= "center" spacing= { 2 }>
                    <Grid item xs= { 12 } md= { 4 } sx= {{ padding: '2px' }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 25px', boxShadow: 1, borderRadius: '7px', minHeight: '360px' }}>
                            <Typography variant= "button" sx= {{ fontWeight: 'bold', fontSize: '110%', color: '#1b4168' }}>Pet Program</Typography>
                            <Typography variant= "body1">We Offer Free Vaccination To Our Beloved Pets. Help Them Be Free From Sickness And Continue To Wag Their Tail With Energy And Happiness. Slide Learn More For More Details.</Typography>
                            <Box display= "flex" flexDirection= "row" justifyContent= "flex-end" alignItems= "center">
                                <Typography component= { Link } to= "/" variant= "body1" sx= {{ textDecoration: 'none', backgroundColor: '#1b4168', color: '#ffffff', padding: '7px 15px', borderRadius: '20px' }}>View more</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } md= { 4 } sx= {{ padding: '2px' }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 25px', boxShadow: 1, borderRadius: '7px', minHeight: '360px' }}>
                            <Typography variant= "button" sx= {{ fontWeight: 'bold', fontSize: '110%', color: '#1b4168' }}>Animal Care</Typography>
                            <Typography variant= "body1">Being A Pet Owner Comes With Responsibilities. It Is Not Just For Other Purposes But Mainly To Bring Love And Care To The Animals. One Of The Duties Of A Responsible Pet Owner Is Knowing How To Take Care Of Their Pet. 
                                Here Are Some Of The Things A Pet Owner Must Know. <span style= {{ fontWeight: 'bold' }}>Be One Of Us</span></Typography>
                            <Box display= "flex" flexDirection= "row" justifyContent= "flex-end" alignItems= "center">
                                <Typography component= { Link } to= "/" variant= "body1" sx= {{ textDecoration: 'none', backgroundColor: '#1b4168', color: '#ffffff', padding: '7px 15px', borderRadius: '20px' }}>View more</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;