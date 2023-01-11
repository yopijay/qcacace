// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ProfileCntxt } from "core/context/ProfileCntxt.func"; // Context

const Account = ({ setElem }) => {
    const { data } = useContext(ProfileCntxt);

    return (
        <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ padding: { xs: '20px', lg: '0' } }}>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                <Avatar src= { JSON.parse(data.avatar) } />
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= "body1">{ data.fname } { data.mname } { data.lname }</Typography>
                    <Typography variant= "button">{ data.user_level }</Typography>
                </Stack>
            </Stack>
            <FontAwesomeIcon icon= { solid('ellipsis-vertical') } onClick= { e => { setElem(e.currentTarget) } } />
        </Stack>
    );
}

export default Account;