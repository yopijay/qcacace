// Libraries
import { Box } from "@mui/material";

// Assets
import Logo from 'assets/images/logo_banner.png';
import { SnakeLoader } from "./Loader";

export const LoaderScreen = () => {

    return (
        <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
             <img alt= "logo" src= { Logo } style= {{ width: '250px' }} />
             <SnakeLoader bg= "#b2bec3" size= "5px" distance= "5px" />
        </Box>
    );
} 