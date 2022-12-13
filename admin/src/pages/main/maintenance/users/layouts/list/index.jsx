// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Custom react query
import { record } from "core/api/index.func"; // APIs

// Constants
import { btnicon, btntxt, search, title } from "./index.style"; // Styles

// Layouts
import Item from "./layouts/Item";

const Index = () => {
    const { setList } = useContext(ListCntxt);
    const { isFetching } = useGet(['usr_list'], record({ table: 'tbl_users', query: JSON.stringify({ condition: '', except: atob(localStorage.getItem('token')) }) }), { refetchOnWindowFocus: false }, (data) => setList(data));

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 1 }>
            <Typography sx= { title }>Users list</Typography>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <form autoComplete = "off">
                    <Box sx= { search }>
                        <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                        <TextField variant= "standard" size= "small" fullWidth= { true } InputProps= {{ disableUnderline: true }} placeholder= "Search..." />
                    </Box>
                </form>
                <Box>
                    <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } style= {{ color: '#ffffff' }} /></Typography>
                    <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btntxt }>New User</Typography>
                </Box>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                { !isFetching ? <Item /> : 
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                    </Stack> }
            </Stack>
        </Stack>
    );
}

export default Index;