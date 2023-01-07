// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, FormLabel, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { base64 } from "core/global/function/index.func"; // Function

// Constants
import { error } from "../index.style"; // Design

// Custom design
const btn = {
    marginTop: '-35px',
    padding: '7px 12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50px',
    zIndex: 1,
    border: 'solid 1px #dfe4ea',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',

    '&:hover': { backgroundColor: '#dfe4ea' }
}

const Profile = ({ fetching }) => {
    const { type } = useParams();
    const { register, errors, setError, getValues, setValue } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');
    
    useEffect(() => { register('avatar'); if(!fetching) { setPic(getValues().avatar !== undefined ? JSON.parse(getValues().avatar) : '#'); } }, [ fetching, getValues, register ]);

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-end">
                <Avatar src= { pic } sx= {{ width: '145px', height: '145px', border: 'solid 5px #dfe4ea' }} />
                { type !== 'view' ? <FormLabel htmlFor= "avatar" sx= { btn }><FontAwesomeIcon icon= { solid('camera') } /></FormLabel> : '' }
                <input type= "file" name= "avatar" id= "avatar" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                    onChange= { async (e) => {
                        setError('avatar', { message: '' });
                        let file = e.target.files[0];
                        let image = await base64(file);
                        
                        setPic(image);
                        setValue('avatar', JSON.stringify(image));
                    }} />
                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.avatar?.message }</Typography>
            </Stack>
        </Stack>
    );
}

export default Profile;