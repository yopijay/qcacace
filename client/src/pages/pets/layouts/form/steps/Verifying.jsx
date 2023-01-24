// Libraries
import { Avatar, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// Core
import { verifying } from "core/api/index.func"; // API
import { useGet } from "core/global/function/index.func"; // Function
import { SnakeLoader } from "core/global/layout/loader/Loader"; // Laoder

// Constants
import Logo from "assets/images/logo.png"; // Assets
import { instruction } from "../index.style"; // Styles

const Verifying = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const { data: vrfyng } = 
        useGet({ key: ['vrfy'], fetch: verifying(atob(userid)), options: { refetchInterval: 1000 }, 
            onSuccess: (data) => {
                if(data.is_email_verified === 1) {
                    let link = `/${(window.location.pathname).split('/')[1]}/${(window.location.pathname).split('/')[2]}/${(window.location.pathname).split('/')[3]}/${(window.location.pathname).split('/')[4]}`;
                    navigate(`${link}/personal-information`);
                }
            } 
        });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 5 } sx= {{ padding: { xs: 0, sm: '0 30px' } }}>
            <Avatar src= { Logo } sx= {{ width: 160, height: 160 }} />
            <Typography sx= { instruction }>We are conducting KYC Verification by Quezon City Animal Care & Adoption Center. This is to protect our 
                customers from AMLA and Money Mules. Please bear with us.</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 2 } sx= {{ width: '100%' }}>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                    <Typography variant= "h4" sx= {{ textAlign: 'center' }}>Please confirm your email address</Typography>
                    <Typography variant= "h6">We send a confimation link to your email.</Typography>
                </Stack>
                { vrfyng?.is_email_verified === 0 ? <SnakeLoader bg= "#C9C9C9" size= "8px" distance= "7px" /> : '' }
            </Stack>
        </Stack>
    );
}

export default Verifying;