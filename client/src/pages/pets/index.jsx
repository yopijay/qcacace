// Libraries
import { Dialog, Grid, Stack } from "@mui/material";
import { useState } from "react";

// Layouts
import Recommended from './recommended';
import List from './list';

// Custom style
const container = {
    padding: '90px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const [ open, setOpen ] = useState(true);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Recommended />
            <List />
            <Dialog open= { open } keepMounted onClose= { () => setOpen(false) } maxWidth= "sm" fullWidth= { true } disableEscapeKeyDown= { true }>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" sx= {{ backgroundColor: '#204c6f' }}>
                    asd
                </Grid>
            </Dialog>
        </Stack>
    );
}

export default Index;