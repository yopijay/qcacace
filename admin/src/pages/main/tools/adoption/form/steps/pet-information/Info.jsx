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

const Info = ({ pet, fetching }) => {

    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            <Grid item><Photo fetching= { fetching } /></Grid>
            <Grid item>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} variant= "body1" gutterBottom>Pet Classification</Typography>
                    <ThemeProvider theme= { theme(dflt) }><Classification pet= { pet } fetching= { fetching } /></ThemeProvider>
                </Stack>
            </Grid>
            <Grid item>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }} variant= "body1" gutterBottom>Condition</Typography>
                    <ThemeProvider theme= { theme(dflt) }><Condition fetching= { fetching } /></ThemeProvider>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Info;