// Libraries
import { Grid, Stack, Typography } from "@mui/material";

const Surrender = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Surrender</Typography>
                <Typography>A Pet Deserves To Have A Home Where They Can Feel Safe And Loved. Remember That We Are Not Encouraging The Pet Owners To Surrender Their 
                    Pets To Our Shelter But If You Have No Other Choice, We Will Always Welcome Them With A Big Hug And Small Kisses.</Typography>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Grid container direction= "column" justifyContent= "stretch" spacing= { 1 }>
                    
                </Grid>
            </Stack>
        </Stack>
    );
}

export default Surrender;