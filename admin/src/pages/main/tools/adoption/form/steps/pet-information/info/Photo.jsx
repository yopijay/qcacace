// Libraries
import { Avatar, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

const Photo = ({ fetching }) => {
    const { getValues } = useContext(FormCntxt);
    const [ pic, setPic ] = useState('#');

    useEffect(() => { if(!fetching) { setPic(getValues().photo !== undefined ? JSON.parse(getValues().photo) : '#'); } }, [fetching, getValues ]);

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ marginBottom: '50px' }}>
            <Avatar src= { pic } sx= {{ width: '150px', height: '150px', border: 'solid 5px #DFE4EA' }} />
        </Stack>
    );
}

export default Photo;