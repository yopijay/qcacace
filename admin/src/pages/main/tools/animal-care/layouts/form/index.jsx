// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { save, specific, update } from "core/api/index.func"; // APIs
import { successToast, useGet, usePost } from "core/global/function/index.func"; // Function
import { theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, card, btntxt, date } from "./index.style"; // Styles
import { validation } from "./index.validation"; // Validation

// Layouts
import Photo from "./layouts/Photo";
import Details from "./layouts/Details";

const input = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { textTransform: 'uppercase', fontWeight:'bold' }
        }
    }
}

const Index = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { setValidation, handleSubmit, setValue, setError, control } = useContext(FormCntxt);
    const { refetch, isFetching: fetching } = 
        useGet({ key: ['animal_care_specific'], fetch: specific({ table: 'tbl_animal_care', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: (data) => { 
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setValue(_name, data[0][_name]); 
                    } 
                }
            } 
        });

    const { mutate: saving } = 
        usePost({ fetch: save, 
            onSuccess: (data) => { 
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/tools/animalcare', { replace: true })); } 
            } 
        });

    const { mutate: updating } = 
        usePost({ fetch: update, 
            onSuccess: (data) => {
                if(data.result === 'error') { (data.error).forEach((err, index) => { setError(err.name, { type: index === 0 ? 'focus' : '', message: err.message }, { shouldFocus: index === 0 }); }); }
                else { successToast(data.message, 3000, navigate('/tools/animalcare', { replace: true })); } 
            } });
        
    useEffect(() => { setValidation(validation()); if(id !== undefined) { refetch() } }, [ setValidation, id, refetch ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Animal Care</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/tools/animalcare" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stertch" sx= { card } spacing= { 2 }>
                <ThemeProvider theme= { theme(input) }>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                        <Box sx= { date }>
                            <Controller control= { control } name= "date" defaultValue= { `${dayjs(new Date()).year()}-${dayjs(new Date()).month() + 1}-${dayjs(new Date()).date()}` }
                                render= { ({ field: { onChange, value } }) => (
                                    <LocalizationProvider dateAdapter= { AdapterDayjs }>
                                        <DatePicker value= { value } renderInput= { (params) => <TextField { ...params } variant= "standard" size= "small" fullWidth /> }
                                            onChange= { e => { onChange(`${dayjs(e).year()}-${dayjs(e).month() + 1}-${dayjs(e).date()}`); } } />
                                    </LocalizationProvider> ) }>
                            </Controller>
                        </Box>
                    </Stack>
                </ThemeProvider>
                <Photo fetching= { fetching } />
                <Details fetching= { fetching } />
            </Stack>
            { type !== 'view' ?
                <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center">
                    <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                        <Box sx= { btntxt } onClick= { handleSubmit(data => {
                            data[type === 'new' ? 'created_by' : 'updated_by'] = atob(localStorage.getItem('token'));
                            
                            if(type === 'new') { saving({ table: 'tbl_animal_care', data: data }); }
                            else { updating({ table: 'tbl_animal_care', data: data }); }
                        }) }>Save</Box>
                    </Grid>
                </Grid> : '' }
        </Stack>
    );
}

export default Index;