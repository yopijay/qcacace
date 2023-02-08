import { Stack, Typography } from "@mui/material";

const Cash = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center">
            <Typography sx= {{ textAlign: 'center', width: '80%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, metus vel scelerisque commodo, 
                odio ipsum dictum est, in hendrerit tortor dolor et tortor. Aenean scelerisque vel ante in posuere. Suspendisse rhoncus tempus erat, 
                nec pharetra purus varius ac. Donec placerat eros sed tincidunt pharetra. In sagittis blandit nisl.</Typography>
        </Stack>
    );
}

export default Cash;