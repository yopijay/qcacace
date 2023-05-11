import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, FormLabel, Skeleton, Stack, Typography } from "@mui/material";
import { FormCntxt } from "core/context/Form";
import { base64 } from "core/global/function/index.func";
import { useContext, useEffect, useState } from "react";

const Photo = ({ fetching }) => {
    const [ photo, setPhoto ] = useState('#');
    const { setError, register, setValue, getValues, errors } = useContext(FormCntxt);

    useEffect(() => {
        register('photo');
        if(!fetching) { setPhoto(getValues().photo !== undefined ? JSON.parse(getValues().photo) : photo); }
    }, [ register, getValues, photo, fetching ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            { fetching ? <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px' }} /> :
                <Stack direction= "row" justifyContent= "center" alignItems= "center"
                    sx= {{ backgroundColor: '#efefef', width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { photo } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack> }
            <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" sx= {{ padding: '0 10px' }}>
                <Stack component= { FormLabel } htmlFor= "photo" direction= "row" justifyContent= "center" alignItems= "center"
                    sx= {{ width: '40px', height: '40px', backgroundColor: '#FFFFFF', boxShadow: 1, borderRadius: '20px', marginTop: '-20px',
                                cursor: 'pointer' }}>
                    <FontAwesomeIcon icon= { solid('camera') } />
                </Stack>
            </Stack>
            <input type= "file" name= "photo" id= "photo" style= {{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }}
                onChange= { async e => {
                    setError('photo', { message: '' });
                    let file = e.target.files[0];
                    let image = await base64(file);

                    setPhoto(image);
                    setValue('photo', JSON.stringify(image));
                } } />
            <Typography variant= "body2" sx= {{ color: '#e84118' }} gutterBottom>{ errors.photo?.message }</Typography>
        </Stack>
    );
}

export default Photo;