// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, FormLabel, Skeleton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/Form"; // Context
import { base64 } from "core/global/function/index.func"; // Function

const ProofBilling = ({ fetching }) => {
    const { type } = useParams();
    const { register, getValues, setValue, setError } = useContext(FormCntxt);
    const [ proof_billing, setProofBilling ] = useState('#');

    useEffect(() => { 
        register('proof_billing'); 
        if(!fetching) { setProofBilling(getValues().proof_billing !== undefined && getValues().proof_billing !== null && getValues().proof_billing !== '' ? JSON.parse(getValues().proof_billing) : '#'); }
    }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*Proof of Billing/Payslip</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                { fetching ? <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px' }} /> :
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                        sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                        <Avatar src= { proof_billing } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                    </Stack> }
                { type !== 'view' ? <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ padding: '0 10px' }}>
                    <Stack component= { FormLabel } htmlFor= "proof_billing" direction= "row" justifyContent= "center" alignItems= "center"
                        sx= {{ width: '40px', height: '40px', backgroundColor: '#ffffff', boxShadow: 1, borderRadius: '20px', marginTop: '-20px',
                                    cursor: 'pointer' }}>
                        <FontAwesomeIcon icon= { solid('camera') } />
                    </Stack>
                </Stack> : '' }
            </Stack>
            <input type= "file" name= "proof_billing" id= "proof_billing" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', zIndex: -1 }}
                onChange= { async e => {
                    setError('proof_billing', { message: '' });
                    let file = e.target.files[0];
                    let image = await base64(file);

                    setProofBilling(image);
                    setValue('proof_billing', JSON.stringify(image));
                } } />
        </Stack>
    );
}

export default ProofBilling;