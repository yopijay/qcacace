// Libraries
import { useContext } from "react";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/List"; // Context
import { errorToast, successToast, usePost } from "core/global/function/index.func"; // Function
import { evaluate } from "core/api/index.func"; // API

// Constants
import { approve, icons, item } from "../index.style"; // Styles

const Item = ({ setOpen, setId }) => {
    const { list, setList } = useContext(ListCntxt);
    const navigate = useNavigate();
    const { mutate: approval } = 
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { successToast(data.message, 3000, navigate('/evaluate/releasing', { replace: true })); setList(data.list); } } });
        
    const { mutate: reject } = 
        usePost({ fetch: evaluate, onSuccess: data => {if(data.result === 'success') { errorToast(data.message, 3000, navigate('/evaluate/releasing', { replace: true })); setList(data.list); } } });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx=  {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
        { list?.length > 0 ?
            list?.map((data, index) => (
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" key= { index } sx= { item }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                        <Avatar src= { JSON.parse(data.photo) } sx= {{ width: 55, height: 55, border: 'solid 5px #dfe4ea' }} />
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                            <Typography variant= "body1" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>#{ data.series_no }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.email }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.lname }, { data.fname }</Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Type: <b>{ (data.type).toUpperCase() }</b></Typography>
                            <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Date evaluated: { data.date_evaluated }</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                        { data.status === 'pending' ? 
                            <Typography sx= { approve } onClick= { () => approval({ table: 'tbl_services', type: 'approve', data: data }) }>
                                <FontAwesomeIcon icon= { solid('square-check') } size= "xl" />
                            </Typography> : '' }
                        {/* { data.status === 'pending' ? 
                            <Typography sx= { disapprove } onClick= { () => reject({ table: 'tbl_services', type: 'reject', data: data }) }>
                                <FontAwesomeIcon icon= { solid('square-xmark') } size= "xl" />
                            </Typography> : '' } */}
                        { data.status !== 'pending' ? 
                            data.status === 'released' ? 
                                <Chip variant= "default" size= "small" label= "Released" sx= {{ backgroundColor: '#4cd137', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : 
                                data.status === 'surrendered' ? 
                                    <Chip variant= "default" size= "small" label= "Surrendered" sx= {{ backgroundColor: '#4cd137', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : 
                                    data.status === 'failed' ? 
                                        <Chip variant= "default" size= "small" label= "Failed" sx= {{ backgroundColor: '#e84118', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : 
                                    <Chip variant= "default" size= "small" label= "Cancelled" sx= {{ backgroundColor: '#e84118', color: '#FFFFFF', textTransform: 'uppercase', fontWeight: 'bold' }} /> : '' }
                        <Typography sx= { icons } onClick= { () => { setOpen(true); setId(data.id); } }>
                            <FontAwesomeIcon icon= { solid('print') } size= "lg" />
                        </Typography>
                        <Typography sx= { icons } component= { Link } to= { `/evaluate/releasing/form/view/${data.id}` }>
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