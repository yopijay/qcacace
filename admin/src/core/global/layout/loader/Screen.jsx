// Libraries
import { Box } from "@mui/material";

// Assets
import Logo from 'assets/images/logo.png';

export const LoaderScreen = () => { return ( <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}><img alt= "logo" src= { Logo } width= "80px" height= "auto" /></Box> ); } 