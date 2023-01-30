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
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                    sx= {{ backgroundColor: '#90bed4cf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                    { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${count.others < 10 ? '0' : ''}${count.others}` }</Typography> : 
                        <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                    <Typography variant= "body1" 
                        sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Total Breeds</Typography>
                </Stack>
            </Grid>
            { (count?.summary)?.map((summ, index) => (
                <Grid item xs= { 4 } sm= { 3 } sx= {{ padding: { xs: '0 5px 0 0' } }} key= { index }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" 
                        sx= {{ backgroundColor: '#ffffffcf', padding: '20px', borderRadius: '10px', border: 'solid 1px #F3F3F3' }}>
                        { !isFetching ? <Typography variant= "h5" sx= {{ fontFamily: 'Boldstrom', color: '#2c3e50' }}>{ `${summ.count < 10 ? '0' : ''}${summ.count}` }</Typography> : 
                            <Skeleton variant= "text" sx= {{ width: '50px', fontSize: '1rem' }} /> }
                        <Typography variant= "body1" 
                            sx= {{ fontWeight: 'bold', color: '#34495e', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ summ.name }</Typography>
                    </Stack>
                </Grid>
            )) }
        </Grid>
    );
}

export default Dashboard;