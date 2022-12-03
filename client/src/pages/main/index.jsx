// Libraries
import { Stack, Typography } from "@mui/material";

// Layouts
import Partners from './partners';
import Services from './services';

// Assets
import Banner from 'assets/images/banner.jpg';

// Custom style
const container = {
    padding: '110px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= { container }>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                <Typography variant= "h5" sx= {{ fontWeight: 'bold', color: '#64a93e' }}>Hi!</Typography>
                <Typography variant= "h5" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Welcome to QC ACAC E-Services</Typography>
            </Stack>
            <img src= { Banner } alt= "banner" width= "100%" height= "auto" style= {{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <Partners />
            <Services />
        </Stack>
    );
}

export default Index;