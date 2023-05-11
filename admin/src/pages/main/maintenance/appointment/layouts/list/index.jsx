// libraries
import { useContext } from "react";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/List"; // Context
import { useGet } from "core/global/function/index.func"; // Function
import { records } from "core/api/index.func"; // API

// Constants
import { btnicon, btntxt } from "./index.style"; // Styles

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
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                { !fetching ? <Item /> :
                    <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
                        <Grid item xs= { 6 } sm= { 3 } md= { 2 } sx= {{ padding: '10px 8px' }}>
                            <Skeleton variant= "rounded" sx= {{ width: '100%', height: '150px' }} />
                        </Grid>
                    </Grid> }
            </Stack>
        </Stack>
    );
}

export default Index;