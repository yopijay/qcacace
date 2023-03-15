// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { save, specific } from "core/api/index.func"; // API
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function

// Layout
import PetCage from "./documentary-requirement/PetCage";
import Picture from "./documentary-requirement/Picture";
import ValidId from "./documentary-requirement/ValidId";

// Constants
import { btntxt, card } from "../../index.style"; // Styles

const DocumentaryRequirement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, setValue, setError } = useContext(FormCntxt);
    const { refetch: docu_specific, isFetching: docu_fetching } =
        useGet({ key: ['docu_specific'], fetch: specific({ table: 'tbl_services', id: id !== undefined ? atob(id) : null }), options: { enabled: true, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name] !== null ? data[0][_name] : ''); 
                    }
                }
            }
        });

    const { mutate: saving } = usePost({ fetch: save, onSuccess: data => { successToast(data.message, 3000, navigate(`/tools/adopt/payment/${btoa(data.id)}`, { replace: true })); } });

    useEffect(() => { docu_specific() }, [ docu_specific ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px', color: '#142F48', fontSize:'20px' }}>Documentary Requirements</Typography>
                        <ValidId fetching= { docu_fetching } />
                        <Picture fetching= { docu_fetching } />
                        <PetCage fetching= { docu_fetching } />
                    </Stack>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 5 } sm= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/pet-information/${id}` }>Back</Box></Grid>
                <Grid item xs= { 5 } sm= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        let _errors = [];
                        data['application_type'] = 'walk-in';
                        data['id'] = atob(id);
                        data['evaluated_by'] = atob(localStorage.getItem('token'));

                        if(data.valid_id === '') { _errors.push({ name: 'valid_id', message: 'This field is required!' }); }
                        if(data.picture=== '') { _errors.push({ name: 'picture', message: 'This field is required!' }); }
                        if(data.pet_cage=== '') { _errors.push({ name: 'pet_cage', message: 'This field is required!' }); }

                        if(!(_errors.length > 0)) { saving({ table: 'tbl_documents', data: data }); }
                        else { _errors.forEach(err => setError(err.name, { message: err.message }) )};
                    }) }>Next</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default DocumentaryRequirement;