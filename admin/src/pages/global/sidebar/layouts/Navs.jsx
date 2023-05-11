// Libraries
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { GlobalCntxt } from "core/context/Global"; // Context
import { Navs as links } from "core/constants/Navs"; // Constasnts
import { ProfileCntxt } from "core/context/Profile"; // Context

// Custom styles
const linkNormal = {
    fontWeight:'bold',
    textDecoration: 'none', 
    padding: '11px 15px', 
    borderRadius: '7px', 
    '&:hover': { backgroundColor: '#F5F5F5' }, 
    transition: 'all 0.2s ease-in-out'
}

const linkActive = {
    color:'#3C4048',
    fontSize: '23px',
    fontWeight:'bold',
    textDecoration: 'none', 
    padding: '11px 15px', 
    borderRadius: '7px', 
    backgroundColor: '#f9f9f9'
}

const container = {
    padding: { 
        xs: '20px', 
        lg: '90px 0 20px 0' 
    }, 
    overflowY: 'scroll', 
    '&::-webkit-scrollbar': { display: 'none' }
}

const Navs = () => {
    const { data } = useContext(ProfileCntxt);
    const { isActive, setIsActive, setOpen } = useContext(GlobalCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container } spacing= { 2 }>
            {
                links().map((ctgy, index) => {
                    if((ctgy.access).includes(data.user_level)) {
                        return (
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } key= { index }>
                                <Typography variant= "body2" sx= {{ fontWeight: 'bold', color: 'rgb(200, 200, 200)' }}>{ ctgy.title }</Typography>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    {
                                        (ctgy.nav).map((link, index) => (
                                            <Typography variant= "body1" component= { Link } to= { link.path } color= "text.secondary" key= { index }
                                                onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', link.name); setIsActive(link.name); } }
                                                sx= { isActive === link.name ? linkActive : linkNormal }>{ link.label }</Typography>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        )
                    }
                })
            }
        </Stack>
    );
}

export default Navs;