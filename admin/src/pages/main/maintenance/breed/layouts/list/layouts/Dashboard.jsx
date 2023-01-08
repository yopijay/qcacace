// Libraries
import { Grid, Skeleton, Stack, Typography } from "@mui/material";

// Core
import { dashboard } from "core/api/index.func"; // API
import { useGet } from "core/global/function/index.func"; // Function

const Dashboard = () => {
    const { data: count, isFetching } = useGet({ key: ['brd_dasboard'], fetch: dashboard('tbl_breed') });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '5px 0' }}>
            <Grid item xs= { 4 } sm= { 6 } sx= {{ padding: { xs: '0 5px 0 0' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#533B64' }}>{ `${count.others < 10 ? '0' : ''}${count.others}` }</Typography> : <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" sx= {{ fontWeight: 'bold', color: '#C8C8C8', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Total Breeds</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 4 } sm= { 3 } sx= {{ padding: { xs: '0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#533B64' }}>{ `${count.dogs < 10 ? '0' : ''}${count.dogs}` }</Typography> : <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" sx= {{ fontWeight: 'bold', color: '#C8C8C8', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dog breeds</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 4 } sm= { 3 } sx= {{ padding: { xs: '0 0 0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#533B64' }}>{ `${count.cats < 10 ? '0' : ''}${count.cats}` }</Typography> : <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" sx= {{ fontWeight: 'bold', color: '#C8C8C8', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cat breeds</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Dashboard;