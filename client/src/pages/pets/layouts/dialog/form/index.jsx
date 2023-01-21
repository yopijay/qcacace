// Libraries
import { Grid, ThemeProvider } from "@mui/material";

// Core
import { input } from "core/global/theme/index.style"; // Theme

// Layouts
import Info from "./layouts/Info";
import Other from "./layouts/Other";

const Form = () => {

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } >
                <ThemeProvider theme= { input }><Info /></ThemeProvider>
                <ThemeProvider theme= { input }><Other /></ThemeProvider>
            </Grid>
        </Grid>
    );
}

export default Form;