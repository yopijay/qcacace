// Libraries
import { useContext } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context
import { btnadopt, btnadopticon, btnicon, btntxt, petdesc, petfemale, petmale } from "../index.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Items = () => {
    let colors = [ '#feca57', '#ee5253', '#0abde3', '#ff9ff3', '#ff9f43', '#f368e0', '#01a3a4', '#00d2d3', '#54a0ff', '#341f97' ];
    const { list } = useContext(ListCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "stretch">
            {
                list.length > 0 ?
                    list?.map((data, index) => (
                        <Grid item xs= { 12 } sm= { 4 } md= { 3 } sx= {{ padding: { xs: '5px 15px', sm: '5px 10px', lg: '5px 20px' } }} key= { index }>
                            <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" sx= {{ boxShadow: 1, borderRadius: '25px', overflow: 'hidden', paddingBottom: '20px', height: '100%' }}>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Box sx= {{ width: '100%', height: '250px', backgroundColor: colors[Math.floor(Math.random() * 10)] }} />
                                    <Box sx= {{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: { xs: '-65% 0 10px 0', md: '-75% 0 20px 0' } }}><img src= { JSON.parse(data.photo) } alt= "pet" width= "50%" height= "250px" /></Box>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                                            <Typography sx= { petdesc }>{ data.age }, { data.size }</Typography>
                                            <Typography sx= { data.gender === 'male' ? petmale : petfemale }><FontAwesomeIcon icon= { data.gender === 'male' ? solid('mars') : solid('venus') } /></Typography>
                                        </Stack>
                                        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ margin: '5px 0 10px 0' }}>
                                            { ((data.tags).split(', ')).map((tag, index) => ( 
                                                <Grid item xs= { 4 } sm= { 6 } lg= { 4 } key= { index } sx= {{ padding: '5px' }}>
                                                    <Typography sx= {{ color: colors[Math.floor(Math.random() * 10)], fontWeight: 'bold', backgroundColor: `${colors[Math.floor(Math.random() * 10)]}3b`, padding: '2px 10px', borderRadius: '10px' }}># { tag.toLowerCase() }</Typography> 
                                                </Grid>
                                                )) }
                                        </Grid>
                                    </Stack>
                                </Stack>
                                <Stack direction= "column" justifyContent= "center" alignItems= "stretch" sx= {{ padding: '0 20px' }}>
                                    <Box sx= { btnadopt }><Typography sx= {{ textAlign: 'center' }}>Adopt</Typography></Box>
                                    <Box sx= { btnadopticon }><Typography sx= {{ textAlign: 'center', color: '#FFFFFF' }}>Adopt</Typography></Box>
                                </Stack>
                            </Stack>
                        </Grid>
                    )) : 
                    <Grid item xs= { 12 }>
                        <Typography sx= {{ width: '100%', textAlign: 'center' }}>No record/s found!</Typography>
                    </Grid>
            }
        </Grid>
    );
}

export default Items;