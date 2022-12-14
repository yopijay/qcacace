// LIbraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";

// Core
import { base64 } from "core/global/function/index.func"; // Function
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

const Documentary = () => {
    const [ validid, setValidid ] = useState('Choose a file');
    const [ ownerpicture, setOwnerpicture ] = useState('Choose a file');
    const [ area, setArea ] = useState('Choose a file');
    const { register } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: { xs: '0 15px', sm: '0 35px' } }} spacing= { 3 }>
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center">
                <Grid item xs= { 12 } md= { 6 }><Typography>*QCID or any Valid ID</Typography></Grid>
                <Grid item xs= { 12 } md= { 6 }>
                    <Box>
                        <input type="file" name="valid_id" id="valid_id" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                            onChange= { async (e) => { 
                                let file = e.target.files[0];
                                let image = await base64(file);

                                register(`document.valid_id`, { value: JSON.stringify(image) });
                                setValidid(file.name)
                            } } />
                        <label htmlFor="valid_id" style= {{ border: 'dashed 1px rgb(220, 220, 200)', padding: '10px 10%', cursor: 'pointer' }}>{ validid }</label>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center">
                <Grid item xs= { 12 } md= { 6 }><Typography>*Applicant 1 x 1 picture</Typography></Grid>
                <Grid item xs= { 12 } md= { 6 }>
                    <Box>
                        <input type="file" name="owner_picture" id="owner_picture" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                            onChange= { async (e) => { 
                                let file = e.target.files[0];
                                let image = await base64(file);
    
                                register(`document.owner_picture`, { value: JSON.stringify(image) });
                                setOwnerpicture(file.name)
                            } } />
                        <label htmlFor="owner_picture" style= {{ border: 'dashed 1px rgb(220, 220, 200)', padding: '10px 10%', cursor: 'pointer' }}>{ ownerpicture }</label>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "center">
                <Grid item xs= { 12 } md= { 6 }><Typography>*Picture of house`s outside and inside, showing the area designated for the desire animal for adoption.</Typography></Grid>
                <Grid item xs= { 12 } md= { 6 }>
                    <Box>
                        <input type="file" name="area" id="area" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                            onChange= { async (e) => { 
                                let file = e.target.files[0];
                                let image = await base64(file);
    
                                register(`document.area`, { value: JSON.stringify(image) });
                                setArea(file.name)
                            } } />
                        <label htmlFor="area" style= {{ border: 'dashed 1px rgb(220, 220, 200)', padding: '10px 10%', cursor: 'pointer' }}>{ area }</label>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Documentary;