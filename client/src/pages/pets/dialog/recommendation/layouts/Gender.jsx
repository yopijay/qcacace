// Libraries
import { FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { genderlabel, gendertitle } from "./layouts.style"; // Styles

const Gender = () => {
    const { control } = useContext(FormCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '15px 0' }}>
            <Typography sx= { gendertitle }>Gender</Typography>
            <Controller control= { control } name= "gender" defaultValue= "male"
                render= { ({ field: { onChange } }) => (
                    <Grid component= { RadioGroup } container direction= "row" justifyContent= "space-between" alignItems= "center">
                        <Grid item xs= { 4 }>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                                <FormControlLabel value= "male" control= { <Radio color= "info" /> } onChange= { (e) => onChange(e.target.value) } />
                                <Typography sx= { genderlabel }>Male</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 4 }>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                                <FormControlLabel value= "female" control= { <Radio color= "info" /> } onChange= { (e) => onChange(e.target.value) } />
                                <Typography sx= { genderlabel }>Female</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs= { 4 }>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                                <FormControlLabel value= "any" control= { <Radio color= "info" /> } onChange= { (e) => onChange(e.target.value) } />
                                <Typography sx= { genderlabel }>Does not matter</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                ) } />
        </Stack>
    );
}

export default Gender;