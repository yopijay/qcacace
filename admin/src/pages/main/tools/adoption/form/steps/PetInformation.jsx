// Libraries
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Box, Grid, Stack, Typography } from "@mui/material";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { specific, update } from "core/api/index.func"; // API

// Constants
import { btntxt, card, scanner } from "../../index.style"; // Constants
import Scanner from "./pet-information/Scanner";
import Info from "./pet-information/Info";

const PetInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ pet, setPet ] = useState(null);
    const [ isscan, setIsscan ] = useState(false);
    const { handleSubmit, setValue } = useContext(FormCntxt);
    const { refetch: srvc_specific, isFetching: srvc_fetching } =
        useGet({ key: ['srvc_specific'], fetch: specific({ table: 'tbl_services', id: atob(id) }), options: { enabled: true, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count]; 
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                } 
            }
        });
        
    const { refetch: pet_specific, isFetching: pet_fetching } =
        useGet({ key: ['pet_specific'], fetch: specific({ table: 'tbl_pets', id: pet !== null ? pet : null }), options: { enabled: pet !== null, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count]; 
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                } 
            }
        });

    const { mutate: updating } = 
        usePost({ fetch: update,
            onSuccess: data => {
                if(data.result === 'error') { errorToast(data.message, 3000); }
                else { successToast(data.message, 3000, navigate(`/tools/adopt/documentary-requirement/${btoa(data.id)}`, { replace: true })); }
            }
        });
    
    useEffect(() => { srvc_specific() }, [ srvc_specific ]);
    useEffect(() => { if(pet !== null) { pet_specific() } }, [ pet, pet_specific ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px', color: '#142F48' }}>Pet Information</Typography>
                        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                            <Typography sx= { scanner } onClick= { () => setIsscan(!isscan) }>
                                <FontAwesomeIcon icon= { solid('qrcode') } />
                            </Typography>
                        </Stack>
                        { isscan ? <Scanner setPet= { setPet } /> : <Info pet= { pet } pet_fetching= { pet_fetching } srvc_fetching= { srvc_fetching } /> }
                    </Stack>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/personal-information/${id}` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        data['application_type'] = 'walk-in';
                        data['pet_id'] = pet;
                        data['id'] = atob(id);

                        updating({ table: 'tbl_services', data: data });
                    }) }>Next</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default PetInformation;