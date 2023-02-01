// libraries
import { useContext } from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { records } from "core/api/index.func"; // API

// Constants
import { btnicon, btntxt, search } from "./index.style"; // Styles

// Layouts
import Item from "./layouts/Item";

const Index = () => {
    const { setList } = useContext(ListCntxt);
    const { isFetching: fetching } = useGet({ key: ['app_list'], fetch: records({ table: 'tbl_appointments', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%' }} spacing= { 3 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Appointments</Typography>
                <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Box>
                        <Typography component= { Link } to= "/maintenance/appointment/form/new" sx= { btnicon }>
                            <FontAwesomeIcon icon= { solid('plus') } style= {{ color: '#FFFFFF' }} />
                        </Typography>
                        <Typography component= { Link } to= "/maintenance/appointment/form/new" sx= { btntxt }>New Appointment</Typography>
                    </Box>
                </Stack>
            </Stack>
            { !fetching ? <Item /> :
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" 
                    sx= {{ backgroundColor: '#FFFFFF', padding: '10px 20px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }} spacing= { 2 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 } sx= {{ flexGrow: 1 }}>
                            <Skeleton variant= "rounded" sx= {{ width: '50%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '25%', height: '10px' }} />
                            <Skeleton variant= "rounded" sx= {{ width: '25%', height: '10px' }} />
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