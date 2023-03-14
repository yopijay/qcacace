// Libraries
import { Grid, Skeleton, Stack, Typography } from "@mui/material";

// Core
import { useGet } from "core/global/function/index.func"; // Function
import { dashboard } from "core/api/index.func"; // API

const Dashboard = () => {
    const { data: count, isFetching } = useGet({ key: ['intr_dashboard'], fetch: dashboard('tbl_schedule') });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= 'stretch' sx= {{ padding: '5px 0' }}>
            <Grid item xs= { 3 } sm= { 6 } sx= {{ padding: { xs: '0 5px 0 0' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#90bed4cf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count.total < 10 ? '0' : ''}${count.total}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold',color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Total</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 3 } sm= { 2 } sx= {{ padding: { xs: '0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count.approved < 10 ? '0' : ''}${count.approved}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Approved</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 3 } sm= { 2 } sx= {{ padding: { xs: '0 0 0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count?.pending < 10 ? '0' : ''}${count?.pending}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pending</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 3 } sm= { 2 } sx= {{ padding: { xs: '0 0 0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count?.failed < 10 ? '0' : ''}${count?.failed}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Failed</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Dashboard;