// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context
import { FormCntxt } from "core/context/FormCntxt.func"; // Context

// Constants
import { categoryicon, categoryiconactive } from "./layouts.style"; // Styles

const Category = () => {
    const { category, setCategory } = useContext(GlobalCntxt);
    const { register } = useContext(FormCntxt);

    return (
        <Stack direction= "row" justifyContent= "space-evenly" alignItems= "center" spacing= { 3 } sx= {{ padding: { xs: '20px 0' } }}>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>
                <Typography sx= { category === 'dog' ? categoryiconactive : categoryicon } onClick= { () => { setCategory('dog'); register('category', { value: 'DOG' }); } }><FontAwesomeIcon icon= { solid('dog') } /></Typography>
                <Typography variant= "caption">Dog</Typography>
            </Stack>
            <Stack direction= "column" justifyContent= "center" alignItems= "center" spacing= { 1 }>
                <Typography sx= { category === 'cat' ? categoryiconactive : categoryicon } onClick= { () => { setCategory('cat'); register('category', { value: 'CAT' }); } }><FontAwesomeIcon icon= { solid('cat') } /></Typography>
                <Typography variant= "caption">Cat</Typography>
            </Stack>
        </Stack>
    );
}

export default Category;