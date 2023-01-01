// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, FormLabel, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { base64 } from "core/global/function/index.func";
import { error } from "../index.style";

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

const Profile = () => {
    const { register, errors, setError } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-end">
                <Avatar src= { pic } sx= {{ width: '145px', height: '145px', border: 'solid 5px #dfe4ea' }} />
                <FormLabel htmlFor= "avatar" sx= { btn }><FontAwesomeIcon icon= { solid('camera') } /></FormLabel>
                <input type= "file" name= "avatar" id= "avatar" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                    onChange= { async (e) => {
                        setError('avatar', { message: '' });
                        let file = e.target.files[0];
                        let image = await base64(file);
                        
                        register('avatar', { value: JSON.stringify(image) });
                        setPic(image);
                    }} />
                <Typography variant= "body2" sx= { error } gutterBottom>{ errors.avatar?.message }</Typography>
            </Stack>
        </Stack>
    );
}

export default Profile;