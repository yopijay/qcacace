// Libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

// Constants
import { brand, btnTxt, error, input, title } from "./index.style"; // Style
import { Validation } from "./index.validation"; // Validation

const Index = () => {
    const { register, formState: { errors } } = useForm({ resolver: yupResolver(Validation()) });

    return (
        <Container maxWidth= "xs">
            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', width: '100%' }}>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center">
                        <Typography gutterBottom variant= "body2" sx= { title }>Sign in to</Typography>&nbsp;
                        <Typography gutterBottom variant= "body2" sx= { brand }>QCACAC E-Services</Typography>
                    </Stack>
                    <Typography gutterBottom variant= "body2"color= "text.disabled">Enter your details below.</Typography>
                    <form autoComplete= "off">
                        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= {{ marginTop: '20px' }}>
                            <Grid item>
                                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                                    <Typography gutterBottom color= "text.secondary">*Email</Typography>
                                    <TextField { ...register('email') } name= "email" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors?.email?.message }</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                                    <Typography gutterBottom color= "text.secondary">*Password</Typography>
                                    <TextField { ...register('password') } type= "password" name= "password" variant= "standard" InputProps= {{ disableUnderline: true }} sx= { input } />
                                    <Typography variant= "body2" sx= { error } gutterBottom>{ errors?.password?.message }</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography sx= {{ width: '100%', textAlign: 'right', margin: '10px 0', fontWeight: 'bold', cursor: 'pointer' }} color= "#204c6f">Forgot Password?</Typography>
                    <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ margin: '10px 0' }}>
                        <Grid item>
                        <Box sx= { btnTxt }>Login</Box>
                            {/* { !isLoading ? <Box sx= { btnTxt } onClick= { handleSubmit(data => signin({data: data, type: 'login'})) }>Login</Box> :
                               <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}><SnakeLoader bg= "#b2bec3" size= "7px" distance= "7px" /></Stack> } */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Index;