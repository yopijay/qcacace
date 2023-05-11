// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { Avatar, Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/List"; // Context

// Constants
import { icons, item } from "../index.style"; // Design

const Item = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
            {
                list.length > 0 ? 
                    list?.map((data, index) => (
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" key= { index } sx= { item }>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                                <Avatar src= { JSON.parse(data.avatar) } sx= {{ width: 55, height: 55, border: 'solid 5px #dfe4ea' }} />
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                                    <Typography variant= "body1" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        { data.lname }, { data.fname } { data.mname } { data.suffix }</Typography>
                                    <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>#{ data.series_no }</Typography>
                                    <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ (data.user_level).toUpperCase() }</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                <Typography sx= { icons } component= { Link } to= { `/maintenance/users/form/update/${data.id}` }><FontAwesomeIcon icon= { solid('pencil') } size= "lg" /></Typography>
                                <Typography sx= { icons } component= { Link } to= { `/maintenance/users/form/view/${data.id}` }><FontAwesomeIcon icon= { solid('eye') } size= "lg" /></Typography>
                            </Stack>
                        </Stack>
                    )) :
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ backgroundColor: '#FFFFFF', padding: '10px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }}>
                        <Typography>No record/s found!</Typography>
                    </Stack>
            }
        </Stack>
    );
}

export default Item;