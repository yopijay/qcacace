// Libraries
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Box, Grid, Stack, Typography } from "@mui/material";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { save, specific } from "core/api/index.func"; // API

// Constants
import { btntxt, card, scanner } from "../../index.style"; // Constants
import Scanner from "./pet-information/Scanner";
import Info from "./pet-information/Info";

const PetInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ pet, setPet ] = useState(null);
    const [ isscan, setIsscan ] = useState(false);
    const { handleSubmit, getValues, setValue } = useContext(FormCntxt);
    
    const { refetch: pet_specific, isFetching: pet_fetching } =
        useGet({ key: ['pet_specific'], fetch: specific({ table: 'tbl_pets', id: pet !== null ? pet : null }), options: { enabled: false, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count]; 
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                } 
            }
        });

    const { mutate: saving } = 
        usePost({ fetch: save,
            onSuccess: data => {
                // if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                // else { successToast(data.message, 3000, navigate(`/tools/adopt/documentary-requirement/${btoa(data.id)}`, { replace: true })); }
            }
        });
        
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
                        { isscan ? <Scanner isscan= { isscan } setIsscan= { setIsscan } setPet= { setPet } /> : <Info pet= { pet } fetching= { pet_fetching } /> }
                    </Stack>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/personal-information/${btoa(getValues()?.id)}` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        data['application_type'] = 'walk-in';
                        data['pet_id'] = pet;
                        data['id'] = id;
                        console.log(data);
                        // saving({ table: 'tbl_pets', data: data });
                    }) }>Next</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default PetInformation;