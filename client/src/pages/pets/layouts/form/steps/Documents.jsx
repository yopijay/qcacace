// Libraries
import { Box, Checkbox, Grid, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { errorToast, successToast, usePost } from "core/global/function/index.func"; // Function
import { save } from "core/api/index.func"; // API

// Constants
import { btntxt } from "../index.style"; // Styles

const Documents = () => {
    const { id, userid } = useParams();
    const navigate = useNavigate();
    const { getValues, control, setValue, handleSubmit } = useContext(FormCntxt);

    const { mutate: saving } = usePost({ fetch: save, onSuccess: data => { successToast(data.message, 3000, navigate(`/pets/${id}/adopt/${userid}/${btoa(data.id)}/appointment`, { replace: true })); } });

    return (
        <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 3 } sx= {{ height: '100%' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                <Typography variant= "h5" sx={{ fontWeight:'600'}}>Documentary Requirements</Typography>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                    <Typography>Please find below the checklist of required documents to be submitted at the Quezon City Animal Care and Adoption Center.
                        Kindly review the following documents to proceed:</Typography>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ paddingLeft: '10px' }}>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= {1 }>
                            <Controller control= { control } name= "valid_id" defaultValue= { getValues()?.valid_id ?? false }
                                render= { ({ field: { onChange } }) => (
                                    <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }}
                                        checked= { getValues()?.valid_id ?? true } onChange= { e => { setValue('valid_id', getValues()?.valid_id ?? false); onChange(e.target.checked); } } />
                                ) } />
                            <Typography>Quezon City ID or Barangay ID.</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= {1 }>
                            <Controller control= { control } name= "picture" defaultValue= { getValues()?.picture ?? false }
                                render= { ({ field: { onChange } }) => (
                                    <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }}
                                        checked= { getValues()?.picture ?? true } onChange= { e => { setValue('picture', getValues()?.picture ?? false); onChange(e.target.checked); } } />
                                ) } />
                            <Typography>One (1) 1x1 picture.</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= {1 }>
                            <Controller control= { control } name= "house" defaultValue= { getValues()?.house ?? false }
                                render= { ({ field: { onChange } }) => (
                                    <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }}
                                        checked= { getValues()?.house ?? true } onChange= { e => { setValue('house', getValues()?.house ?? false); onChange(e.target.checked); } } />
                                ) } />
                            <Typography>Picture of the house, showing the designated area for the pet.</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= {1 }>
                            <Controller control= { control } name= "payslip" defaultValue= { getValues()?.payslip ?? false }
                                render= { ({ field: { onChange } }) => (
                                    <Checkbox sx= {{ color: '#919eab', '&.Mui-checked': { color: '#2065d1' } }}
                                        checked= { getValues()?.payslip ?? true } onChange= { e => { setValue('payslip', getValues()?.payslip ?? false); onChange(e.target.checked); } } />
                                ) } />
                            <Typography>Proof of billing or pay slip.</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } component= { Link } to= { `/pets/${id}/adopt/${userid}/personal-information` }>Back</Box>
                </Grid>
                <Grid item xs= { 5 } sm= { 4 } md= { 5 } lg= { 3 }>
                    <Box sx= { btntxt } onClick= { handleSubmit(data => {
                        data['pet_id'] = atob(id);
                        
                        if(!(data.valid_id) || !(data.picture) || !(data.house) || !(data.payslip)) { errorToast('Please check all the checkbox to proceed!', 3000); }
                        else { saving({ table: 'tbl_documents', data: data }); }
                    }) }>Next</Box>
                </Grid>
            </Grid> 
        </Stack>
    );
}

export default Documents;