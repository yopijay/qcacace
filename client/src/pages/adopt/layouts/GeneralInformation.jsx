// Libraries
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { getDate, randomizer } from "core/global/function/index.func"; // Function

const GeneralInformation = () => {
    const { register, getValues } = useContext(FormCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: { xs: '0 15px', sm: '0 35px' } }}>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography>Application Type: <span style= {{ fontWeight: 'bold', textTranform: 'uppercase' }}>Adoption(Individual)</span></Typography>
                    <Typography>Application Number: <span style= {{ fontWeight: 'bold', textTranform: 'uppercase' }}>#{ getValues().series_no }</span></Typography>
                    <TextField { ...register('series_no', {  value: randomizer(7) }) } name= "series_no" variant= "standard" InputProps= {{ disableUnderline: true }} type= "hidden" />
                </Stack>
            </Grid>
            <Grid item xs= { 12 } md= { 6 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-end">
                    <Typography>Date of Application: <span style= {{ fontWeight: 'bold', textTranform: 'uppercase' }}>{ getDate(new Date()).formatted }</span></Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 12 }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 } sx= {{ paddingTop: '30px' }}>
                    <Typography variant= "body1" sx= {{ fontWeight: 'bold' }}>General Instruction</Typography>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Typography variant= "body2">1. Fill out the application form by typing or ticking the applicable boxes. The applicant must completely and clearly fill out all required data fields and information.</Typography>
                        <Typography variant= "body2">2. Please make sure that all necessary documents are properly attached, and fill out all required fields. Application form with missing information will be returned to the applicant or not processed.</Typography>
                        <Typography variant= "body2">3. Please avoid sending documents or pictures that are too blurry, as this may cause in your application being rejected.</Typography>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default GeneralInformation;