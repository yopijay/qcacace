// Libraries
import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider

// Layouts
import List from './layouts/list';

// Custom styles
const container = {
    overflow: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= { container }>
            <Routes><Route exact path= "/" element= { <ListPrvdr><List /></ListPrvdr> } /></Routes>
        </Stack>
    );
}
export default Index;