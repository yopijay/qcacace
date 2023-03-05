// Libraries
import { Stack } from "@mui/material";

// Core
import { FormPrvdr } from "core/context/FormCntxt.func"; // Context

// Layouts
import Form from "./layouts/Form";

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
            <Stack direciton= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }}>
                <FormPrvdr><Form /></FormPrvdr>
            </Stack>
        </Stack>
    );
}

export default Index;