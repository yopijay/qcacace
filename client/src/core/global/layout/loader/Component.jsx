// Libraries
import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";

export const Component = () => {
    return (
        <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', width: '100%', height: '100%', padding: '80px 0 0 0' }}>
            <Container maxWidth= "lg">
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', height: '100%' }}>
                    <Skeleton width= "300px" height= "50px" />
                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid container direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                            <Grid item xs= { 6 } sm= { 6 } md= { 5 }><Skeleton width= "100%" height= "60px" /></Grid>
                            <Grid item xs= { 6 } sm= { 3 } md= { 4 } lg= { 3 }>
                                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                                    <Grid item xs= { 3 } sm= { 3 } md= { 2 }><Skeleton width= "100%" height= "60px" /></Grid>
                                    <Grid item xs= { 3 } sm= { 3 } md= { 2 }><Skeleton width= "100%" height= "60px" /></Grid>
                                    <Grid item xs= { 3 } sm= { 3 } md= { 2 }><Skeleton width= "100%" height= "60px" /></Grid>
                                    <Grid item xs= { 3 } sm= { 3 } md= { 6 }>
                                        <Skeleton width= "100%" height= "60px" sx= {{ display: { xs: 'flex', md: 'none' } }} />
                                        <Skeleton width= "100%" height= "60px" sx= {{ display: { xs: 'none', md: 'flex' } }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Stack spacing={ 1 } direction= "column" justifyContent= "flex-start" alignItems= "stretch" marginTop= "20px">
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                        <Skeleton variant= "rounded" animation= "wave" height= "100px" sx= {{ borderRadius: '5px' }} />
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}