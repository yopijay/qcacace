// Libraries
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, useGet, usePost } from "core/global/function/index.func";
import { save, specific } from "core/api/index.func";
import { personalinformation } from "../../index.validation";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { btntxt, card } from "../../index.style";

const PetInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, setValidation, setError, getValues, setValue } = useContext(FormCntxt);
    const { refetch, isFetching: fetching } =
        useGet({ key: ['adpt_specific'], fetch: specific({ table: 'tbl_services', id: atob(id) ?? null }), options: { enabled: false, refetchOnWindowFocus: false },
            onSuccess: data => {
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count]; 
                        setValue(_name === 'pet_gender' ? 'gender' : _name, data[0][_name] !== null ? data[0][_name] : ''); 
                    } 
                } 
            }
        });

    const { mutate: saving } = 
        usePost({ fetch: save,
            onSuccess: data => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate(`/tools/adopt/documentary-requirement/${btoa(data.id)}`, { replace: true })); }
            }
        });

    useEffect(() => { setValidation(personalinformation()); if(id !== undefined) { refetch(); } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ height: '100%', paddingBottom: '20px' }} spacing= { 2 }>
            <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
            <Box sx= { card }>
                <form autoComplete= "off">
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        <Typography variant= "body1" sx= {{ fontWeight: 'bold', marginBottom: '15px', color: '#142F48' }}>Pet Information</Typography>
                        
                    </Stack>
                </form>
            </Box>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ paddingTop: '20px' }}>
                <Grid item xs= { 6 } md= { 5 } lg= { 3 }><Box sx= { btntxt } component= { Link } to= { `/tools/adopt/personal-information/${btoa(getValues()?.id)}` }>Back</Box></Grid>
                <Grid item xs= { 6 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => { 
                        data['application_type'] = 'walk-in';
                        saving({ table: 'tbl_pets', data: data });
                    }) }>Next</Box>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default PetInformation;