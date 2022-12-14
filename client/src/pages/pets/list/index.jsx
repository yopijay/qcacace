// Libraries
import { Container, Stack, Typography } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider

// Constants
import Item from './layouts/Item';

const  Index = (props) => {
    const { setOpen } = props;

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                <Typography sx= {{ fontFamily: 'Tommy Bold', color: '#204c6f', fontSize: { xs: '140%', md: '150%' } }}>List</Typography>
                <ListPrvdr><Item setOpen= { setOpen } /></ListPrvdr>
            </Stack>
        </Container>
    );
}

export default Index;