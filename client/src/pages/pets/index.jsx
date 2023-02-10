// Libraries
import { Stack } from "@mui/material";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider
import { useGet } from "core/global/function/index.func"; // Function
import { recommend, records } from "core/api/index.func"; // API

// Layouts
import List from './layouts/list';
import Adopt from './layouts/dialog';
import Footer from '../global/footer';
import Form from './layouts/form';

// Constants
import { container } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const { list, setList } = useContext(ListCntxt);
    const [ dialog, setDialog ] = useState(localStorage.getItem('recommend') === null || list.length > 0);
    const { isFetching: fetching } = useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: {} }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Routes>
                <Route exact path= "/" element= {
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%' }}>
                        <List setDialog= { setDialog } list= { list } fetching= { fetching } />
                        <FormPrvdr><Adopt dialog= { dialog } setDialog= { setDialog } /></FormPrvdr>
                    </Stack>
                } />
                <Route exact path= "/:id/adopt/*" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
            <Footer />
        </Stack>
    );
}

export default Index;