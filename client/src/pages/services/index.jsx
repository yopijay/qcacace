// Libraries
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Link, Route, Routes, useParams } from "react-router-dom";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider

// Layouts
import AnimalCare from "./contents/AnimalCare";
import MissingPets from "./contents/MissingPets";
import PetProgram from "./contents/PetProgram";
import Surrender from "./contents/Surrender";

// Constants
import { container, tab, tabactive } from "./index.style"; // Styles

const Index = () => {
    const { srvc } = useParams();
    localStorage.setItem('nav', 'services');

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } divider={ <Divider orientation="horizontal" flexItem /> } 
            sx= {{ overflow: 'hidden', padding: '90px 0 0 0', height: '100%' }}>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Typography sx= { srvc === 'pet-program' ? tabactive : tab } component= { Link } to= "/services/pet-program">Pet Program</Typography>
                    <Typography sx= { srvc === 'animal-care' ? tabactive : tab } component= { Link } to= "/services/animal-care">Animal Care</Typography>
                    <Typography sx= { srvc === 'missing-pets' ? tabactive : tab } component= { Link } to= "/services/missing-pets">Missing Pets</Typography>
                    <Typography sx= { srvc === 'surrender' ? tabactive : tab } component= { Link } to= "/services/surrender">Surrender</Typography>
                </Stack>
            </Container>
            { srvc === 'pet-program' ? <ListPrvdr><PetProgram /></ListPrvdr> :
                srvc === 'animal-care' ? <AnimalCare /> :
                srvc === 'missing-pets' ? <ListPrvdr><MissingPets /></ListPrvdr> :
                srvc === 'surrender' ? <FormPrvdr><Surrender /></FormPrvdr> : '' }
        </Stack>
    );
}

export default Index;