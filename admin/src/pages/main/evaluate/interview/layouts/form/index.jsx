// Libraries
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, InputAdornment, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";

// Core
import { evaluate, specific } from "core/api/index.func"; // APIs
import { errorToast, successToast, useGet, usePost } from "core/global/function/index.func"; // Functions
import { FormCntxt } from "core/context/Form"; // Context
import { theme } from "core/global/theme/index.style"; // Theme

// Constants
import { btnicon, btntxt, card, txtfld } from "./index.style"; // Styles
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
    const { id, type } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setValue } = useContext(FormCntxt);
    const [ total, setTotal ] = useState(0);
    
    const { data: docs } = 
        useGet({ key: ['docs_specific'], fetch: specific({ table: 'tbl_documents', id: id ?? null }), options: { enabled: type !== 'new', refetchOnWindowFocus: false },
            onSuccess: (data) => { 
                if(Array.isArray(data)) { 
                    for(let count = 0; count < Object.keys(data[0]).length; count++) { 
                        let _name = Object.keys(data[0])[count];
                        setTotal((data[0].q1 !== null ? data[0].q1 : 0) + (data[0].q2 !== null ? data[0].q2 : 0) + (data[0].q3 !== null ? data[0].q3 : 0)
                                            + (data[0].q4 !== null ? data[0].q4 : 0) + (data[0].q5 !== null ? data[0].q5 : 0))
                        setValue(_name, data[0][_name] !== null ? _name === 'tags' ? JSON.parse(data[0][_name]) : data[0][_name] : ''); 
                    } 
                }
            } 
    });

    const { mutate: approval } = 
        usePost({ fetch: evaluate, onSuccess: data => { if(data.result === 'success') { successToast(data.message, 3000, navigate('/evaluate/interview', { replace: true })); } } });

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ width: '100%', height: '100%', paddingBottom: '20px' }} spacing= { 3 }>
            <Stack direction= "row" justifyContent= "space-between" alignItems= "center">
                <Typography variant= "h6" sx= {{ fontFamily: 'Boldstrom', color: '#3C4048' }}>Interview</Typography>
                <Typography sx= { btnicon } component= { Link } to= "/evaluate/interview" ><FontAwesomeIcon icon= { solid('chevron-left') }/></Typography>
            </Stack>
            <Box sx= { card }>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                    <form autoComplete= "off">
                        <ThemeProvider theme= { theme(input) }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                                <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                                    <Grid item xs= { 7 } md= { 9 }>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                            <Typography>1.</Typography>
                                            <Typography sx= {{ flexGrow: 1 }}>Do you like having pets such as dogs or cats? If yes, have you had any pets in the past or currently have one?
                                            (Mahilig po ba kayo sa alagang aso o pusa? Kung oo, may naging alaga na po ba kayo o alaga sa kasalukuyan?)</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs= { 4 } md= { 2 }>
                                        <TextField { ...register('q1') } name= "q1" variant= "standard" type= "number" defaultValue= "0" disabled= { type === 'view' }
                                            onChange= { e => { 
                                                setValue('q1', e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value);
                                                setTotal(parseInt(e.target.value !== '' ? e.target.value : 0) + parseInt(getValues().q2 !== '' ? getValues().q2 : 0)
                                                    + parseInt(getValues().q3 !== '' ? getValues().q3 : 0) + parseInt(getValues().q4 !== '' ? getValues().q4 : 0)
                                                    + parseInt(getValues().q5 !== '' ? getValues().q5 : 0)); } }
                                            InputProps= {{ inputProps: { min: 0, max: 20 }, disableUnderline: true, endAdornment: <InputAdornment position="end">/20</InputAdornment>, }} sx= { txtfld } />
                                    </Grid>
                                </Grid>
                                <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                                    <Grid item xs= { 7 } md= { 9 }>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                            <Typography>2.</Typography>
                                            <Typography sx= {{ flexGrow: 1 }}>Why do you like to adopt a pet such as a dog or cat? (Bakit nyo po gustong mag ampon ng alagang aso o puas?)</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs= { 4 } md= { 2 }>
                                        <TextField { ...register('q2') } name= "q2" variant= "standard" type= "number" defaultValue= "0" disabled= { type === 'view' }
                                            onChange= { e => { 
                                                setValue('q2', e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value);
                                                setTotal(parseInt(getValues().q1 !== '' ? getValues().q1 : 0) + parseInt(e.target.value !== '' ? e.target.value : 0)
                                                    + parseInt(getValues().q3 !== '' ? getValues().q3 : 0) + parseInt(getValues().q4 !== '' ? getValues().q4 : 0)
                                                    + parseInt(getValues().q5 !== '' ? getValues().q5 : 0)); } }
                                            InputProps= {{ inputProps: { min: 0, max: 20 }, disableUnderline: true, endAdornment: <InputAdornment position="end">/20</InputAdornment>, }} sx= { txtfld } />
                                    </Grid>
                                </Grid>
                                <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                                    <Grid item xs= { 7 } md= { 9 }>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                            <Typography>3.</Typography>
                                            <Typography sx= {{ flexGrow: 1 }}>Do you own your own house or do you rent? Do you have designated space for the adopted dog or cat?
                                            (May sarili po ba kayong bahay o nangungupahan? May nakalaan po ba kayong pwestso para aampuning alagang aso o pusa?)</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs= { 4 } md= { 2 }>
                                        <TextField { ...register('q3') } name= "q3" variant= "standard" type= "number" defaultValue= "0" disabled= { type === 'view' }
                                            onChange= { e => { 
                                                setValue('q3', e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value);
                                                setTotal(parseInt(getValues().q1 !== '' ? getValues().q1 : 0) + parseInt(getValues().q2 !== '' ? getValues().q2 : 0) 
                                                    + parseInt(e.target.value !== '' ? e.target.value : 0) + parseInt(getValues().q4 !== '' ? getValues().q4 : 0)
                                                    + parseInt(getValues().q5 !== '' ? getValues().q5 : 0)); } }
                                            InputProps= {{ inputProps: { min: 0, max: 20 }, disableUnderline: true, endAdornment: <InputAdornment position="end">/20</InputAdornment>, }} sx= { txtfld } />
                                    </Grid>
                                </Grid>
                                <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                                    <Grid item xs= { 7 } md= { 9 }>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                            <Typography>4.</Typography>
                                            <Typography sx= {{ flexGrow: 1 }}>How many people live with you in your house? Do you have young children or are there children in your household?
                                            If yes, are they okay with adopting a dog or cat as a pet? (Ilan ang mga kasama mo sa bahay? May maliliit po ba kayong anak or may kasamang bata sa
                                            tahanan niyo? Kung mayroon, ayos lang po ba sa kanila ang pag ampon niyo ng alalgang aso o pusa?)</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs= { 4 } md= { 2 }>
                                        <TextField { ...register('q4') } name= "q4" variant= "standard" type= "number" defaultValue= "0" disabled= { type === 'view' }
                                            onChange= { e => { 
                                                setValue('q4', e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value);
                                                setTotal(parseInt(getValues().q1 !== '' ? getValues().q1 : 0) + parseInt(getValues().q2 !== '' ? getValues().q2 : 0) 
                                                    + parseInt(getValues().q3 !== '' ? getValues().q3 : 0) + parseInt(e.target.value !== '' ? e.target.value : 0) 
                                                    + parseInt(getValues().q5 !== '' ? getValues().q5 : 0)); } }
                                            InputProps= {{ inputProps: { min: 0, max: 20 }, disableUnderline: true, endAdornment: <InputAdornment position="end">/20</InputAdornment>, }} sx= { txtfld } />
                                    </Grid>
                                </Grid>
                                <Grid container direction= "row" justifyContent= "space-between" alignItems= "center">
                                    <Grid item xs= { 7 } md= { 9 }>
                                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                                            <Typography>5.</Typography>
                                            <Typography sx= {{ flexGrow: 1 }}>How many people live with you in your house? Do you have young children or are there children in your household?
                                            If yes, are they okay with adopting a dog or cat as a pet? (Ilan ang mga kasama mo sa bahay? May maliliit po ba kayong anak or may kasamang bata sa
                                            tahanan niyo? Kung mayroon, ayos lang po ba sa kanila ang pag ampon niyo ng alalgang aso o pusa?)</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs= { 4 } md= { 2 }>
                                        <TextField { ...register('q5') } name= "q5" variant= "standard" type= "number" defaultValue= "0" disabled= { type === 'view' }
                                            onChange= { e => { 
                                                setValue('q5', e.target.value > 20 ? 20 : e.target.value < 0 ? 0 : e.target.value);
                                                setTotal(parseInt(getValues().q1 !== '' ? getValues().q1 : 0) + parseInt(getValues().q2 !== '' ? getValues().q2 : 0) 
                                                    + parseInt(getValues().q3 !== '' ? getValues().q3 : 0) + parseInt(getValues().q4 !== '' ? getValues().q4 : 0)
                                                    + parseInt(e.target.value !== '' ? e.target.value : 0) ); } }
                                            InputProps= {{ inputProps: { min: 0, max: 20 }, disableUnderline: true, endAdornment: <InputAdornment position="end">/20</InputAdornment>, }} sx= { txtfld } />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </ThemeProvider>
                    </form>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                            <Typography sx= {{ fontWeight: 'bold' }}>Overall score:</Typography>
                            <Typography>{ total } / 100</Typography>
                        </Stack>
                        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                            <Typography sx= {{ fontWeight: 'bold' }}>Remarks:</Typography>
                            <Typography>{ total >= 75 ? 'PASSED' : 'FAILED' }</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            <Box>
                { docs?.[0]?.sc_status === 'pending' ? 
                    <Grid container direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                        <Grid item xs= { 12 } sm= { 3 } lg= { 2 }>
                            <Box sx= { btntxt }
                                onClick= { handleSubmit(data => {
                                    data['evaluator'] = atob(localStorage.getItem('token'));
                                    
                                    if((data.q1 === '' || data.q1 === null) || (data.q2 === '' || data.q2 === null) || (data.q3 === '' || data.q3 === null)
                                        || (data.q4 === '' || data.q4 === null) || (data.q5 === '' || data.q5 === null)) { 
                                        errorToast('Score/s must not be empty!', 3000); 
                                    }
                                    else { approval({ table: 'tbl_schedule', type: 'approve', data: data }); }
                                })}>Save</Box>
                        </Grid>
                    </Grid> : '' }
            </Box>
        </Stack>
    );
}

export default Index;