// Libraries
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";

// Constants
import { itemLink, itemText, itemTitle, subtitle, title } from "./index.style"; // Styles
import { About } from "core/constants/About.const"; // Items

const Index = () => {

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>About us</Typography>
                    <Typography sx= { title }>Who we are?</Typography>
                </Box>
            </Grid>
            <Container maxWidth= "lg">
                {
                    About().map((item, index) => (
                        <Grid item key= { index }>
                            <Grid container direction= { index % 2 === 0 ? 'row' : 'row-reverse' } justifyContent= "space-evenly" alignItems= "center" sx= {{ padding: '20px 0' }} spacing= { 2 }>
                                <Grid item xs= { 6 } sm= { 5 } md= { 3 } lg= { 3 }><img src= { item.img } alt= { item.alt } width= "100%" height= "auto" style= {{ borderRadius: '20px' }} /></Grid>
                                <Grid item xs= { 12 } sm= { 7 } md= { 6 } lg= { 5 }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}><Typography sx= { itemTitle }>{ item.title }</Typography></Box>
                                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}><Typography sx= { itemText }>{ item.info }</Typography></Box>
                                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: { xs: 'center', md: 'flex-end'}, alignItems: 'center' }}><Typography component= { Link } href= { item.link } target= "_blank" sx= { itemLink }>Learn more</Typography></Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
            </Container>
        </Grid>
    );
}

export default Index;