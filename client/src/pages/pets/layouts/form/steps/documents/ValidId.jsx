// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, FormLabel, Skeleton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { base64 } from "core/global/function/index.func"; // Function


const ValidId = ({ fetching }) => {
    const [ valid_id, setValidid ] = useState('#');
    const { setError, register, setValue, getValues, errors } = useContext(FormCntxt);

    useEffect(() => { 
        register('valid_id');  
        if(!fetching) { setValidid(getValues().valid_id !== undefined ? JSON.parse(getValues().valid_id) : valid_id); }
    }, [ register, getValues, valid_id, fetching ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*QC ID or Brgy. ID.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                { fetching ? <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px' }} /> :
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                        sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                        <Avatar src= { valid_id } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                    </Stack> }
                <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ padding: '0 10px' }}>
                    <Stack component= { FormLabel } htmlFor= "valid_id" direction= "row" justifyContent= "center" alignItems= "center"
                        sx= {{ width: '40px', height: '40px', backgroundColor: '#ffffff', boxShadow: 1, borderRadius: '20px', marginTop: '-20px',
                                    cursor: 'pointer' }}>
                        <FontAwesomeIcon icon= { solid('camera') } />
                    </Stack>
                </Stack>
            </Stack>
            <input type= "file" name= "valid_id" id= "valid_id" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                onChange= { async e => {
                    setError('valid_id', { message: '' });
                    let file = e.target.files[0];
                    let image = await base64(file);

                    setValidid(image);
                    setValue('valid_id', JSON.stringify(image));
                } } />
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.valid_id?.message }</Typography>
        </Stack>
    );
}

export default ValidId;