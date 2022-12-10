// Libraries
import { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

// Constants
import { breedtitle, closebtn, okbtn, title } from "./index.style"; // Style

// Assets
import Preferbg from 'assets/images/prefer-bg.jpg';
import Dog from 'assets/images/dog.png';
import Cat from 'assets/images/cat.png';
import Both from 'assets/images/cat-dog.png';

// Layouts
import Category from "./layouts/Category";
import Gender from "./layouts/Gender";

const Index = (props) => {
    const { setOpen } = props;
    const { category } = useContext(GlobalCntxt);
    
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ backgroundImage: `url(${Preferbg})`, padding: { xs: '20px' }, height: '100%' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Typography sx= { closebtn } onClick= { () => setOpen(false) }><FontAwesomeIcon icon= { solid('circle-xmark') } /></Typography>
                </Box>
            </Grid>
            <Grid item>
                <Grid container direction= "row" justifyContent= {{ xs: 'center', md: 'flex-start' }} alignItems= "center">
                    <Grid item xs= { 12 } sm= { 8 } md= { 7 } sx= {{ padding: { xs: '20px 15px', sm: '30px 25px' } }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= { title }>Tell us what you prefer...</Typography>
                            <Category />
                            <Gender />
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                                <Typography sx= { breedtitle }>Breed</Typography>
                            </Stack>
                            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}><Typography sx= { okbtn }>Done</Typography></Box>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 5 } sm= { 4 } md= { 5 } sx= {{ padding: { xs: 0, md: '0 40px', sm: '0 30px' }, marginTop: { xs: '40px' } }}><img src= { category === 'dog' ? Dog : category === 'cat' ? Cat : Both } alt= "category" width= "100%" height= "auto" /></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;