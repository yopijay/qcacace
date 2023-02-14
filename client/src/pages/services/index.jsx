// Libraries
import { useState } from "react";

// Libraries
import { Container, Divider, Stack, Typography } from "@mui/material";

// Layouts
import AnimalCare from "./contents/AnimalCare";
import MissingPets from "./contents/MissingPets";
import PetProgram from "./contents/PetProgram";
import Surrender from "./contents/Surrender";

// Constants
import { container, tab, tabactive } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'services');
    const [ content, setContent ] = useState('pet-program');

    return (
        <Container maxWidth= "lg">
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= { container } divider={ <Divider orientation="horizontal" flexItem /> }>
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Typography sx= { content === 'pet-program' ? tabactive : tab } onClick= { () => setContent('pet-program') }>Pet Program</Typography>
                    <Typography sx= { content === 'animal-care' ? tabactive : tab } onClick= { () => setContent('animal-care') }>Animal Care</Typography>
                    <Typography sx= { content === 'missing-pet' ? tabactive : tab } onClick= { () => setContent('missing-pet') }>Missing Pets</Typography>
                    <Typography sx= { content === 'surrender' ? tabactive : tab } onClick= { () => setContent('surrender') }>Surrender</Typography>
                </Stack>
                { content === 'pet-program' ? <PetProgram /> :
                    content === 'animal-care' ? <AnimalCare /> :
                        content === 'missing-pet' ? <MissingPets /> :
                            content === 'surrender' ? <Surrender /> : '' }
            </Stack>
        </Container>
    );
}

export default Index;