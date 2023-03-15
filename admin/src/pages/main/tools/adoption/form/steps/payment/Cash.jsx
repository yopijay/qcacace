import { Stack, Typography } from "@mui/material";

const Cash = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" sx= {{ marginTop: '20px' }}>
            <Typography sx= {{ textAlign: 'center', width: '80%', fontWeight:'bold'}}>You may also settle your payment at Quezon City Animal Care and Adoption Center located 
                at Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines. 
                Please go to the counter where a staff member will assist you with your payment.</Typography>
        </Stack>
    );
}

export default Cash;