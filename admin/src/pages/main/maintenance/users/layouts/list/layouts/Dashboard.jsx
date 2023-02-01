// Libraries
import { Grid, Skeleton, Stack, Typography } from "@mui/material";

// Core
import { useGet } from "core/global/function/index.func"; // Function
import { dashboard } from "core/api/index.func"; // API

const Dashboard = () => {
    const { data: count, isFetching } = useGet({ key: ['usr_dashboard'], fetch: dashboard('tbl_users') });

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= 'stretch' sx= {{ padding: '5px 0' }}>
            <Grid item xs= { 4 } sm= { 6 } sx= {{ padding: { xs: '0 5px 0 0' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#90bed4cf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count.total < 10 ? '0' : ''}${count.total}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold',color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Total Users</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 4 } sm= { 3 } sx= {{ padding: { xs: '0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count.active < 10 ? '0' : ''}${count.active}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Active Users</Typography>
                </Stack>
            </Grid>
            <Grid item xs= { 4 } sm= { 3 } sx= {{ padding: { xs: '0 0 0 5px' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count?.inactive < 10 ? '0' : ''}${count?.inactive}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Inactive Users</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Dashboard;