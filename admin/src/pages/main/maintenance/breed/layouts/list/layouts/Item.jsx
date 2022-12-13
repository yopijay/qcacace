// Libraries
import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { getDate } from "core/global/function/index.func"; // Function

// Constants
import { icons, item } from "../index.style"; // Styles

const Item = () => {
    const { list } = useContext(ListCntxt);
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            { list?.length > 0 ?
                list?.map((data, index) => (
                    <Stack direction= "row" justifyContent= "sapce-between" alignItems= "center" key= { index } sx= { item }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" flexGrow= "1">
                            <Typography variant= "caption" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>#{ data.series_no }</Typography>
                            <Typography variant= "body1" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.name }</Typography>
                            <Typography variant= "caption" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ getDate(new Date(data.date_created)).formatted }</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 }>
                            <Typography sx= { icons } component= { Link } to= { `/maintenance/category/form/update/${data.id}` }><FontAwesomeIcon icon= { solid('pencil') } size= "lg" /></Typography>
                            <Typography sx= { icons } component= { Link } to= { `/maintenance/category/form/view/${data.id}` }><FontAwesomeIcon icon= { solid('eye') } size= "lg" /></Typography>
                        </Stack>
                    </Stack>
                )) : <Typography variant= "caption" sx= {{ textAlign: 'center' }}>No record/s found!</Typography>}
        </Stack>
    );
}

export default Item;