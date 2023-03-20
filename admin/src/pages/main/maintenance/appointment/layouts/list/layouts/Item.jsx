// Libraries
import { useContext } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Context

// Constants
import { item } from "../index.style"; // Styles
import { months } from "core/constants/Date.const";

const Item = () => {
    const { list } = useContext(ListCntxt);

    return (
        <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start">
            { list?.length > 0 ?
                list?.map((data, index) => (
                    <Grid item xs= { 6 } sm= { 3 } md= { 2 } sx= {{ padding: '10px 8px' }} key= { index }>
                        <Stack direction= "column" justifyContent= "center" alignItems= "center" sx= { item } component= { Link } to= { `/maintenance/appointment/form/update/${data.id}` }>
                            <Typography variant= "h4">{ data.day }</Typography>
                            <Typography variant= "body2">{ months()[parseInt(data.month) - 1].name }, { data.year }</Typography>
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