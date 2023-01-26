// Libraries
import { Grid, ThemeProvider } from "@mui/material";

// Core
import { theme } from "core/global/theme/index.style"; // Theme

// Layouts
import Info from "./layouts/Info";
import Other from "./layouts/Other";

const Form = () => {
    const input = {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': { borderBottom: 'none' },
                    '&:after': { borderBottom: 'none' },
                    '&.Mui-disabled:before': { borderBottom: 'none' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
                },
                input: { textAlign: 'left', textTransform: 'uppercase' }
            }
        }
    }

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
            <Grid item xs= { 12 } >
                <ThemeProvider theme= { theme(input) }><Info /></ThemeProvider>
                <ThemeProvider theme= { theme(input) }><Other /></ThemeProvider>
            </Grid>
        </Grid>
    );
}

export default Form;