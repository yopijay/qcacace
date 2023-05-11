// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/List"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { look, records } from "core/api/index.func"; // API

// Constants
import { btnicon, btntxt, search } from "./index.style"; // Styles

// Layouts
import Dashboard from "./layouts/Dashboard";
import Item from "./layouts/Item";

const Index = () => {
    const { setList } = useContext(ListCntxt);
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });
    const { isFetching: fetching } = 
        useGet({ key: ['usr_list'], fetch: records({ table: 'tbl_users', data: { id: atob(localStorage.getItem('token')) } }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Users</Typography>
                <Dashboard />
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                    <form autoComplete= "off">
                        <Box sx= { search }>
                            <FontAwesomeIcon icon= { solid('magnifying-glass') } size= "sm" style= {{ margin: '8px' }} />
                            <TextField variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true }} placeholder= "Search..." sx= {{ padding: '5px 0 0 0'}}
                                onChange= { e => { find({ table: 'tbl_users', data: { condition: e.target.value !== '' ? (e.target.value).toUpperCase() : e.target.value, id: atob(localStorage.getItem('token')) } }); } }  />
                        </Box>
                    </form>
                    <Box>
                        <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } style= {{ color: '#ffffff' }} /></Typography>
                        <Typography component= { Link } to= "/maintenance/users/form/new" sx= { btntxt }>New User</Typography>
                    </Box>
                </Stack>
            </Stack>
            { !fetching && !finding ? <Item /> :  
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ backgroundColor: '#FFFFFF', padding: '10px 20px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }} spacing= { 2 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                        <Skeleton variant= "circular" sx= {{ width: 55, height: 55 }} />
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ flexGrow: 1 }}>
                            <Skeleton variant= "rounded" sx= {{ width: '50%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '25%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '27%', height: '10px' }} />
                        </Stack>
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        <Skeleton variant= "rounded" sx= {{ padding: '15px' }} />
                        <Skeleton variant= "rounded" sx= {{ padding: '15px' }} />
                    </Stack>
                </Stack> }
        </Stack>
    );
}

export default Index;