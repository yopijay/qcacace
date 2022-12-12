// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Constants
import { btnicon } from "./index.style"; // Styles 

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 1 }>
            {/* <Typography component= { Link } to= "/maintenance/users" sx= { btnicon }>asdasd</Typography> */}
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography sx= { btnicon } component= { Link } to= "/maintenance/users" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
        </Stack>
    );
}

export default Index;