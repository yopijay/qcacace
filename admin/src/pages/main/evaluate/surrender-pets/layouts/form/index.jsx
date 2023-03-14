// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

// Core
import { evaluate, specific } from "core/api/index.func"; // APIs
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Functions
import { input } from "core/global/theme/index.style"; // Theme
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Layouts
import Photo from "./layouts/Photo";
import PetClassification from "./layouts/PetClassification";
import PetCondition from "./layouts/PetCondition";
import Email from "./layouts/Email";
import OwnerInformation from "./layouts/OwnerInformation";

// Constants
import { btnicon, btntxt, card } from "./index.style"; // Styles
import ValidId from "./layouts/documents/ValidId";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValue } = useContext(FormCntxt);
    
    const { data: surr, isFetching: fetching } = 
        useGet({ key: ['surr_specific'], fetch: specific({ table: 'tbl_surrender', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                }
            } });

    const { mutate: approval } =
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { successToast(data.message, 3000, navigate('/evaluate/surrender-pets', { replace: true })); }  } });
        
    const { mutate: reject } = 
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { errorToast(data.message, 3000, navigate('/evaluate/surrender-pets', { replace: true })); } } });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Surrender Pets</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/evaluate/surrender-pets" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Photo fetching= { fetching } />
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase'}}>Pet Classification</Typography>
                            <ThemeProvider theme= { input }><PetClassification fetching= { fetching } /></ThemeProvider>
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}>Other Information</Typography>
                            <ThemeProvider theme= { input }><PetCondition fetching= { fetching } /></ThemeProvider>
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}>Owner Information</Typography>
                            <Email />
                            <ThemeProvider theme= { input }><OwnerInformation fetching= { fetching } /></ThemeProvider>
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography sx= {{ fontWeight: 'bold', textTransform: 'uppercase' }}>Documentary Requirements</Typography>
                            <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                                <Grid item xs= { 12 } md= { 6 } lg= { 4 }><ValidId fetching= { fetching } /></Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </form>
            </Box>
            <Box>
                { surr?.[0]?.status === 'pending' ?
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }><Box sx= { btntxt } onClick= { () => approval({ table: 'tbl_surrender', type: 'approve', data: { id: id } }) }>Approved</Box></Grid>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }><Box sx= { btntxt } onClick= { () => reject({ table: 'tbl_surrender', type: 'reject', data: { id: id } }) }>Reject</Box></Grid>
                    </Grid> : '' }
            </Box>
        </Stack>
    );
}

export default Index;