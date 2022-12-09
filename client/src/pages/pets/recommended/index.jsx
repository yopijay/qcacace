// Libraries
import { Container, Grid, Stack, Typography } from "@mui/material";

const Index = () => {
    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography>Recommended</Typography>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                    <Grid item xs= { 3 }>asd</Grid>
                    <Grid item xs= { 3 }>asd</Grid>
                    <Grid item xs= { 3 }>asd</Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

export default Index;