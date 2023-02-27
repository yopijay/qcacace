import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Custom styles
const container = {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= { container }>
            <Routes>
                <Route exact path= "/" element= { } />
            </Routes>
        </Stack>
    );
}

export default Index;