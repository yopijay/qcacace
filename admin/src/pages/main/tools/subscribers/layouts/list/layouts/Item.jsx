// Libraries
import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context

const Item = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '0 0 40px 0', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
            {
                list.length > 0 ? 
                    list?.map((data, index) => (
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" key= { index } 
                            sx= {{ backgroundColor: '#FFFFFF', padding: '10px 20px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }}>
                            <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= {{ flexGrow: 1 }} spacing= { 1 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start">
                                    <Typography variant= "body1" sx= {{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>#{ data.series_no}</Typography>
                                    <Typography variant= "body2" sx= {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ data.email }</Typography>
                                </Stack>
                                { data.is_subscribe === 1 ? <Box sx= {{ width: '10px', height: '10px', backgroundColor: '#1eca49', borderRadius: '20px' }} /> : 
                                    <Box sx= {{ width: '10px', height: '10px', backgroundColor: '#EF9F9F', borderRadius: '20px' }} /> }
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