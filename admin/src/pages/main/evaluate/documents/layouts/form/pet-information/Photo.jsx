// Libraries
import { useContext, useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

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
                <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.photo?.message }</Typography>
            </Stack>
        </Stack>
    );
}

export default Photo;