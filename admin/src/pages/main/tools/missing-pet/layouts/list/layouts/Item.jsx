// Libraries
import { Link } from "react-router-dom";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { ListCntxt } from "core/context/List"; // Context

// Constants
import { item, label } from "../index.style"; // Design

const Item = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
            { list?.length > 0 ?
                list?.map((data, index) => (
                    <Grid item xs= { 12 } sm= { 6 } md= { 4 } sx= {{ padding: '10px 8px' }} key= { index }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { item } component= { Link } to= { `/tools/missing/form/update/${data.id}` }>
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                                <Avatar src= { JSON.parse(data.photo) } sx= {{ width: 70, height: 70, border: 'solid 5px #dfe4ea' }} />
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, overflow: 'hidden' }}>
                                    <Typography variant= "body1" sx= { label } style= {{ fontWeight: 'bold' }}>#{ data.series_no }</Typography>
                                    <Typography variant= "h6" sx= { label }>{ data.stage }</Typography>
                                    <Typography variant= "body2" sx= { label }>{ data.date_created }</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                )) :
                <Grid item xs= { 12 } sx= {{ padding: '10px 8px' }}>
                    <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ backgroundColor: '#FFFFFF', padding: '10px', border: 'solid 1px #F3F3F3', borderRadius: '10px' }}>
                        <Typography>No record/s found!</Typography>
                    </Stack>
                </Grid> }
        </Grid>
    );
}

export default Item;