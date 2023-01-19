// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dialog, DialogContent, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

// Assets
import Logo from 'assets/images/logo.png';
import BG from 'assets/images/section.jpg';

const Index = ({ dialog, setDialog  }) => {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog fullScreen= { fullscreen } open= { dialog }  fullWidth maxWidth= "md">
            <DialogContent sx= {{ backgroundImage: `url(${BG})`, padding: '30px 50px' }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= 'stretch' spacing= { 3 }>
                    <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                        <Typography variant= "h5" sx= {{ fontWeight: 'bold' }}>Tell us what you want!</Typography>
                        <Typography sx= {{ fontSize: '150%', color: '#C3C3C3', cursor: 'pointer' }} onClick= { () => setDialog(false) }><FontAwesomeIcon icon= { solid('xmark') } /></Typography>
                    </Stack>
                     
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default Index;