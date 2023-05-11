// Libraries
import { useContext, useEffect, useState } from "react";
import { Avatar, FormLabel, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { FormCntxt } from "core/context/Form"; // Context
import { base64 } from "core/global/function/index.func"; // Function

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

const Photo = () => {
    const { register, errors, setError, setValue } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');

    useEffect(() => { register('photo'); }, [ register ]);

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-end">
            <Avatar src= { pic } sx= {{ width: '145px', height: '145px', border: 'solid 5px #DFE4EA' }} />
            <FormLabel htmlFor= "photo" sx= { btn }><FontAwesomeIcon icon= { solid('camera') } /></FormLabel>
            <input type= "file" name= "photo" id= "photo" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', zIndex: -1 }}
                onChange= { async (e) => {
                    setError('photo', { message: '' });
                    let file = e.target.files[0];
                    let image = await base64(file);

                    setPic(image);
                    setValue('photo', JSON.stringify(image));
                }} />
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.photo?.message }</Typography>
        </Stack>
        </Stack>
    );
}

export default Photo;