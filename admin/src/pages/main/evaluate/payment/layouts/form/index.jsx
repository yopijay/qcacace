// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { evaluate, specific } from "core/api/index.func";
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func";
import { Link, useNavigate, useParams } from "react-router-dom";
import { btnicon, btntxt, card } from "./index.style";

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    
    const { data: docs, refetch, isFetching: fetching } = 
        useGet({ key: ['docs_specific'], fetch: specific({ table: 'tbl_adopter_documents', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false } });

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
                { console.log(docs) }
            </Box>
            <Box>
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt }>Approved</Box>
                    </Grid>
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt }>Reject</Box>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
}

export default Index;