// Libraries
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

// Layouts
import PersonalInformation from "./steps/PersonalInformation";
import PetInformation from "./steps/PetInformation";
import DocumentaryRequirement from "./steps/DocumentaryRequirement";
import Payment from "./steps/Payment";
import Released from "./steps/Released";

const Index = () => {
    const { steps } = useParams();

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddinBottom: '20px' }}>
            { steps === 'personal-information' ? <PersonalInformation /> : 
                steps === 'pet-information' ? <PetInformation /> : 
                    steps === 'documentary-requirement' ? <DocumentaryRequirement /> :
                        steps === 'payment' ? <Payment /> : <Released /> }
        </Stack>
    );
}

export default Index;