// Libraries
import { Grid, Stack, ThemeProvider, Typography } from "@mui/material";

// Core
import { theme } from "core/global/theme/index.style"; // Theme

// Layouts
import Photo from "./info/Photo";
import Classification from "./info/Classification";
import Condition from "./info/Condition";

// Constants
const dflt = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { textTransform: 'uppercase' }
        }
    }
}

const Info = ({ pet, srvc_fetching, pet_fetching }) => {

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Grid item><Photo pet= { pet } pet_fetching= { pet_fetching } srvc_fetching= { srvc_fetching } /></Grid>
            <Grid item>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'20px' }} variant= "body1" gutterBottom>Pet Classification</Typography>
                    <ThemeProvider theme= { theme(dflt) }><Classification pet= { pet } pet_fetching= { pet_fetching } srvc_fetching= { srvc_fetching } /></ThemeProvider>
                </Stack>
            </Grid>
            <Grid item>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase', fontSize:'20px' }} variant= "body1" gutterBottom>Condition</Typography>
                    <ThemeProvider theme= { theme(dflt) }><Condition pet_fetching= { pet_fetching } srvc_fetching= { srvc_fetching } /></ThemeProvider>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Info;