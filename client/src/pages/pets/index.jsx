// Libraries
import { Container, Stack, ThemeProvider } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { input } from "core/global/theme/index.style"; // Theme

// Layouts
import List from './layouts/list';
import Footer from '../global/footer';

// Constants
import { container } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'pets');

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Container maxWidth= "lg" sx= {{ marginBottom: '30px' }}>
                <ThemeProvider theme= { input }><ListPrvdr><List /></ListPrvdr></ThemeProvider>
            </Container>
            <Footer />
        </Stack>
    );
}

export default Index;