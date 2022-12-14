// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { useGet } from "core/global/function/index.func"; // Custom functions
import { record } from "core/api/index.func"; // APIs

// Assets
import Dog from 'assets/images/dog.png';
import Cat from 'assets/images/cat.png';
import { Link } from "react-router-dom";

const Item = () => {
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];
    const { list, setList } = useContext(ListCntxt);
    const { isFetching } = useGet(['pet_recommend'], record({ table: 'tbl_pets', query: `WHERE pet.gender= '${JSON.parse(localStorage.getItem('recommend')).gender}' AND ctg.name= '${JSON.parse(localStorage.getItem('recommend')).category}' ORDER BY pet.date_created DESC` }), { refetchOnWindowFocus: false }, (data) => setList(data));

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } sx= {{ padding: '30px 0' }}>
            { !isFetching ? 
                list?.length > 0 ?
                     list?.map((data, index) => (
                        <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px'} }} key= { index }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                                <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                                <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { data.category === 'DOG' ? Dog : Cat } alt= "pet" width= "60%" height= "auto" /></Box>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                        <Typography variant= "caption" sx= {{ fontWeight: 'bold', color: '#777d9c' }}>#{ data.series_no }</Typography>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                            <Typography sx= {{ fontWeight: 'bold', color: '#777d9c', fontSize: '105%' }}>{ data.age }, { data.size }</Typography>
                                            <Typography sx= {{ color: data.gender === 'male' ? '#1ec2df' : '#e84393', fontSize: { md: '110%' } }}><FontAwesomeIcon icon= { data.gender === 'male' ? solid( 'mars') : solid( 'venus') } /></Typography>
                                        </Stack>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ margin: '10px 0 20px 0' }}>
                                            <Typography sx= {{ color: '#ffde88', fontWeight: 'bold', backgroundColor: '#ffde883b', padding: '2px 10px', borderRadius: '10px' }}># friendly</Typography>
                                            <Typography sx= {{ color: '#1aa6d1', fontWeight: 'bold', backgroundColor: '#1aa6d13b', padding: '2px 10px', borderRadius: '10px'  }}># smart</Typography>
                                        </Stack>
                                        <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                            <Typography component= { Link } to= "/pets/adopt/form" onClick= { () => localStorage.setItem('adopt', data.id) }
                                                sx= {{ textDecoration: 'none', cursor: 'pointer', backgroundColor: '#204c6f', color: '#f5f6fa', '&:hover': { backgroundColor: '#1b405d' }, borderRadius: '7px', padding: { xs: '10px 50px', md: '7px 35px' } }} >Adopt Me</Typography>
                                        </Box>
                                    </Stack>
                            </Stack>
                        </Grid>
                     )) : <Typography variant= "caption" sx= {{ textAlign: 'center' }}>No record/s found!</Typography> : '' }
        </Grid>
    );
}

export default Item;