// Libraries
import { Container, Stack, Typography } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Context

// Assets
import Item from "./layouts/Item";

const Index = () => {

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography sx= {{ fontFamily: 'Tommy Bold', color: '#204c6f', fontSize: { xs: '160%', md: '170%' } }}>Recommended</Typography>
                <ListPrvdr><Item /></ListPrvdr>
            </Stack>
        </Container>
    );
}

export default Index;