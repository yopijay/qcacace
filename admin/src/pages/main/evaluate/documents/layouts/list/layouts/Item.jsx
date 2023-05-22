// Libraries
import { useContext } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/List"; // Context

// Constants
import { icons, item } from "../index.style"; // Styles

const Item = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx=  {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
        { list?.length > 0 ?
            list?.map((data, index) => (
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" key= { index } sx= { item }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                            <Typography variant= "body1" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>#{ data.series_no }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.email }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.lname }, { data.fname }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Date evaluated: { data.date_evaluated }</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        { data.status === 'pending' ? 
                            <Typography sx= { icons } component= { Link } to= { `/evaluate/documents/form/update/${data.id}/${btoa(data.email)}` }>
                                <FontAwesomeIcon icon= { solid('pencil') } size= "lg" />
                            </Typography> : '' }
                        { data.status !== 'pending' ? 
                            data.status === 'approved' ? 
                                <Chip variant= "default" size= "small" label= "Approved" sx= {{ backgroundColor: '#4cd137', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : 
                                data.status === 'reject' ? 
                                    <Chip variant= "default" size= "small" label= "Reject" sx= {{ backgroundColor: '#e84118', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : '' : '' }
                        <Typography sx= { icons } component= { Link } to= { `/evaluate/documents/form/view/${data.id}/${btoa(data.email)}` }>
                            <FontAwesomeIcon icon= { solid('eye') } size= "lg" />
                        </Typography>
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