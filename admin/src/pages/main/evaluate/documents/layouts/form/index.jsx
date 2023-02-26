// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { evaluate, specific } from "core/api/index.func"; // APIs
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Functions

// Constants
import { btnicon, btntxt, card } from "./index.style"; // Styles

// Layouts
import ValidId from "./documents/ValidId";
import Picture from "./documents/Picture";
import PetCage from "./documents/PetCage";

const Index = () => {
    const { type, id, email } = useParams();
    const navigate = useNavigate();
    
    const { data: docs, isFetching: fetching } = 
        useGet({ key: ['docs_specific'], fetch: specific({ table: 'tbl_documents', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false } });

    const { mutate: approval } = 
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { successToast(data.message, 3000, navigate('/evaluate/documents', { replace: true })); }  } });
        
    const { mutate: reject } = 
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { errorToast(data.message, 3000, navigate('/evaluate/documents', { replace: true })); } } });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Documents</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/evaluate/documents" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                    <Typography variant= "h5">Documentary Requirements</Typography>
                    <ValidId fetching= { fetching } docs= { docs } />
                    <Picture fetching= { fetching } docs= { docs } />
                    <PetCage fetching= { fetching } docs= { docs } />
                </Stack>
            </Box>
            <Box>
                { docs?.[0]?.status === 'pending' ?
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                            <Box sx= { btntxt }
                                onClick= { () => approval({ table: 'tbl_documents', type: 'approve', data: { id: id, email: atob(email) } }) }>Approved</Box>
                        </Grid>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                            <Box sx= { btntxt }
                                onClick= { () => reject({ table: 'tbl_documents', type: 'reject', data: { id: id, email: atob(email) } }) }>Reject</Box>
                        </Grid>
                    </Grid> : '' }
            </Box>
        </Stack>
    );
}

export default Index;