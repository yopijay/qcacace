// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

// Constants
import { btnicon, btntxt, search, title } from "./index.style"; // Styles

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 1 }>
            <Typography sx= { title }>Users list</Typography>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <form autoComplete = "off">
                    <Box sx= { search }>
                        <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                        <TextField variant= "standard" size= "small" fullWidth= { true } InputProps= {{ disableUnderline: true }} placeholder= "Search..." />
                    </Box>
                </form>
                <Box>
                    <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } style= {{ color: '#ffffff' }} /></Typography>
                    <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btntxt }>New User</Typography>
                </Box>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
                <Stack direction= "row" justifyContent= "center" alignItems= "center">
                    <Typography variant= "caption">No record/s found!</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Index;