// Libraries
import { Avatar, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

const Photo = ({ pet, pet_fetching, srvc_fetching }) => {
    const { getValues } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');

    useEffect(() => { if(!pet_fetching && !srvc_fetching) { setPic(getValues().photo !== '' ? JSON.parse(getValues().photo) : '#'); } }, [ pet_fetching, srvc_fetching, pet, getValues ]);

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
            <Avatar src= { pic } sx= {{ width: '150px', height: '150px', border: 'solid 5px #DFE4EA' }} />
        </Stack>
    );
}

export default Photo;