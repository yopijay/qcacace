// Libraries
import { FormControlLabel, Radio, Stack, Typography } from "@mui/material";

// Constants
import { genderlabel, gendertitle } from "./layouts.style"; // Styles

const Gender = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ padding: '15px 0' }}>
            <Typography sx= { gendertitle }>Gender</Typography>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 3 }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                    <FormControlLabel value= "male" control= { <Radio /> } />
                    <Typography sx= { genderlabel }>Male</Typography>
                </Stack>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                    <FormControlLabel value= "female" control= { <Radio /> } />
                    <Typography sx= { genderlabel }>Female</Typography>
                </Stack>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                    <FormControlLabel value= "any" control= { <Radio /> } />
                    <Typography sx= { genderlabel }>Does not matter</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Gender;