// Libraries
import { Stack, Typography } from "@mui/material";
import { FormPrvdr } from "core/context/Form";
import { Link, Route, Routes } from "react-router-dom";

// Layouts
import Form from './form';

// Custom styles
const container = {
    overflow: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

export const btntxt = { 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    borderRadius: '20px',
    padding: '7px 35px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

const Index = () => {

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= { container }>
            <Routes>
                <Route exact path= "/" element= { 
                    <Stack direction= "column" justifyContent= "center" alignItems= "center" sx= {{ width: '100%', height: '100%' }} spacing= { 1 }>
                        <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Adopt a pet</Typography>
                        <Typography component= { Link } to= "/tools/adopt/personal-information" sx= { btntxt }>Procced</Typography>
                    </Stack>
                } />
                <Route exact path= "/:steps" element= { <FormPrvdr><Form /></FormPrvdr> } />
                <Route exact path= "/:steps/:id" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
        </Stack>
    );
}
export default Index;