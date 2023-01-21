// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Dialog, DialogContent, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context


// Constants
import BG from 'assets/images/section.jpg'; // Assets
import { btntxt } from "../list/index.style"; // Styles
import Form from "./form"; // Layout
import { validation } from "./index.validation"; // Validation

const Index = ({ dialog, setDialog  }) => {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { setValidation, handleSubmit, setError,} = useContext(FormCntxt);
        
    useEffect(() => { setValidation(validation()); }, [ setValidation ]);

    return (
        <Dialog fullScreen= { fullscreen } open= { dialog }  fullWidth maxWidth= "md">
            <DialogContent sx= {{ backgroundImage: `url(${BG})`, padding: '30px 50px' }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= 'stretch' spacing= { 3 }>
                    <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                        <Typography variant= "h5" sx= {{ fontWeight: 'bold' }}>Tell us what you want!</Typography>
                        <Typography sx= {{ fontSize: '150%', color: '#C3C3C3', cursor: 'pointer' }} onClick= { () => setDialog(false) }><FontAwesomeIcon icon= { solid('xmark') } /></Typography>
                    </Stack>
                    <Form />
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                            <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                                if(data.pet_category_id !== 0) {
                                    if(data.breed_Id !== 0) {
                                        if(data.tags !== undefined) {
                                            if((data.tags).length > 0) { 
                                                localStorage.setItem('recommend', JSON.stringify(data));
                                                setDialog(false);
                                            }
                                            else { setError('tags', { message: 'This field is required!' }); }
                                        }
                                        else { setError('tags', { message: 'This field is required!' }); }
                                    }
                                    else { setError('breed_id', { message: 'This field is required!' }); }
                                }
                                else { setError('pet_category_id', { message: 'This field is required!' }); }
                            })}>Save</Box>
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default Index;