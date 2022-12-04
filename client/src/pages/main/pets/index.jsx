// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Constants
import { petdesc, petfemale, petmale, petname, subtitle, title } from "./index.style"; // Styles

// Assets
import Pet1 from 'assets/images/pets/pet1.png';
import Pet2 from 'assets/images/pets/pet2.png';
import Pet3 from 'assets/images/pets/pet3.png';

const Index = () => {
    return (
        <Grid container direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
            <Grid item>
                <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx= { subtitle }>Our Pets</Typography>
                    <Typography sx= { title }>Waiting for Adoption</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Grid container direction= "row" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '20px 0' }}>
                    <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                            <Box sx= {{ width: '100%', height: '250px', backgroundColor: '#1ec2df' }} />
                            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { Pet1 } alt= "pet" width= "60%" height= "auto" /></Box>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                    <Typography sx= { petname }>Pet 1</Typography>
                                    <Typography sx= { petmale }><FontAwesomeIcon icon= { solid('mars') } /></Typography>
                                </Stack>
                                <Typography sx= { petdesc }>1 Year Old, 15KG</Typography>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                    <Typography sx= {{ color: '#ffde88', fontWeight: 'bold', backgroundColor: '#ffde883b', padding: '2px 10px', borderRadius: '10px' }}># friendly</Typography>
                                    <Typography sx= {{ color: '#1aa6d1', fontWeight: 'bold', backgroundColor: '#1aa6d13b', padding: '2px 10px', borderRadius: '10px'  }}># smart</Typography>
                                </Stack>
                                <Typography component= { Link } to= "/pets" sx= {{ color: '#777d9c' }}>{ `Read more >>` }</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                            <Box sx= {{ width: '100%', height: '250px', backgroundColor: '#ffa8ae' }} />
                            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { Pet2 } alt= "pet" width= "60%" height= "auto" /></Box>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                    <Typography sx= { petname }>Pet 2</Typography>
                                    <Typography sx= { petmale }><FontAwesomeIcon icon= { solid('mars') } /></Typography>
                                </Stack>
                                <Typography sx= { petdesc }>10 Months, 10KG</Typography>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                    <Typography sx= {{ color: '#ffde88', fontWeight: 'bold', backgroundColor: '#ffde883b', padding: '2px 10px', borderRadius: '10px' }}># kind</Typography>
                                    <Typography sx= {{ color: '#1aa6d1', fontWeight: 'bold', backgroundColor: '#1aa6d13b', padding: '2px 10px', borderRadius: '10px'  }}># smart</Typography>
                                </Stack>
                                <Typography component= { Link } to= "/pets" sx= {{ color: '#777d9c' }}>{ `Read more >>` }</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }}>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                            <Box sx= {{ width: '100%', height: '250px', backgroundColor: '#6d70c8' }} />
                            <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { Pet3 } alt= "pet" width= "60%" height= "auto" /></Box>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                    <Typography sx= { petname }>Pet 3</Typography>
                                    <Typography sx= { petfemale }><FontAwesomeIcon icon= { solid('venus') } /></Typography>
                                </Stack>
                                <Typography sx= { petdesc }>7 Months, 6KG</Typography>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                    <Typography sx= {{ color: '#ffde88', fontWeight: 'bold', backgroundColor: '#ffde883b', padding: '2px 10px', borderRadius: '10px' }}># kind</Typography>
                                </Stack>
                                <Typography component= { Link } to= "/pets" sx= {{ color: '#777d9c' }}>{ `Read more >>` }</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;