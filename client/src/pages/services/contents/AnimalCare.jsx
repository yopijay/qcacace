// Libraries
import { Container, Stack, Typography } from "@mui/material";

const AnimalCare = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 } sx= {{ overflow: 'hidden', height: '100%' }}>
            <Container maxWidth= "lg" sx= {{ overflowY: 'scroll', height: '100%', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                    <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#444444' }}>Animal Care</Typography>
                    <Typography>Being A Pet Owner Comes With Responsibilities. It Is Not Just For Other Purposes But Mainly To Bring Love And Care To The Animals. 
                        One Of The Duties Of A Responsible Pet Owner Is Knowing How To Take Care Of Their Pet. Here Are Some Of The Things A Pet Owner Must Know. Be One Of Us</Typography>
                </Stack>
            </Container>
        </Stack>
    );
}

export default AnimalCare;