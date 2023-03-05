// Libraries
import { Container, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { look, recommend, records } from "core/api/index.func"; // API

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
    const { isFetching: fetching } = 
        useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: { is_adopt: 0 } }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });
    const { data: recommended, mutate: recommendation, isLoading: recommending } = usePost({ fetch: recommend });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Routes>
                <Route exact path= "/" element= {
                    <Container maxWidth= "lg">
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <List setDialog= { setDialog } 
                                list= { list } 
                                find= { find }
                                finding= { finding }
                                fetching= { fetching } 
                                recommended= { recommended } 
                                recommendation= { recommendation }   
                                recommending= { recommending } />
                            <FormPrvdr><Adopt dialog= { dialog } setDialog= { setDialog } recommendation= { recommendation } /></FormPrvdr> 
                        </Stack>
                    </Container>
                } />
                <Route exact path= "/:id/adopt/*" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
            <FormPrvdr><Footer /></FormPrvdr>
        </Stack>
    );
}

export default Index;