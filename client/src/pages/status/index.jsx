// Libraries
import { Container, Stack, Typography } from "@mui/material";
import { get } from "core/api/index.func";
import { getDate, useGet } from "core/global/function/index.func";
import { useParams } from "react-router-dom";

// Custom style
const container = {
    padding: '90px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    const { id } = useParams();
    const adopt = useGet(['ctg_specific'], get({ table: 'tbl_adopt', type: 'specific', query: id ?? null }), { refetchOnWindowFocus: false });

    return (
        <Container maxWidth= "sm" sx= { container }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ border: 'dashed 1px rgb(220, 220, 220)', padding: '20px 50px', borderRadius: '15px' }}>
                <Typography variant= "h5">#{ (adopt.data)?.[0].series_no }</Typography>
                <Typography variant= "caption">{ getDate(new Date((adopt.data)?.[0].date_requested)).formatted }</Typography>
                <Typography variant= "body2" sx= {{ padding: '20px 0', textTransform: 'uppercase' }}>Status: { (adopt.data)?.[0].status }</Typography>
                { (adopt.data)?.[0].status === 'payment' ? 
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                        <Typography>Kindly send your payment in this number: <span style= {{ fontWeight: 'bold' }}>0000000000</span> via GCASH and wait for at least 3 mins before reloading this page. Thank you!</Typography>
                    </Stack> : ''
                }
                { console.log(adopt.data) }
            </Stack>
        </Container>
    );
}

export default Index;