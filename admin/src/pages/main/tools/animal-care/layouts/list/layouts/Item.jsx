// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context

// Constants
import { item } from "../index.style"; // Styles

const Item  = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
            { list?.length > 0 ?
                list?.map((data, index) => (
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" key= { index } sx= { item } spacing= { 1 }
                        component= { Link } to= { `/tools/animalcare/form/update/${data.id}` }>
                        <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                            <Typography>#{ data.series_no }</Typography>
                            <Typography>{ data.date }</Typography>
                        </Stack>
                        { data.photo !== null ? 
                            <Stack direction= "row" justifyContent= "center" alignItems= "center"
                                sx= {{ backgroundColor: '#efefef', width: '100%', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
                                <Avatar src= { JSON.parse(data.photo) } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                            </Stack> : '' }
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                            <Typography variant= "h6" sx= {{ fontWeight: 'bold' }}>{ data.title }</Typography>
                            <Typography variant= "h5">{ data.subtitle }</Typography>
                            <Typography variant= "body2">{ data.description }</Typography>
                        </Stack>
                    </Stack>
                )) :
                <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ backgroundColor: '#FFFFFF', padding: '10px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }}>
                    <Typography>No record/s found!</Typography>
                </Stack> }
        </Stack>
    );
}

export default Item;