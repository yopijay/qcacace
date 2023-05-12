// Libraries
import { Dialog, DialogContent, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

// Constants
import { btntxt } from "../index.style"; // Styles

// Assets
import QC from "assets/images/qc-logo.png";
import CVD from "assets/images/cvd.png";
import { useGet, usePost } from "core/global/function/index.func";
import { certificate } from "core/api/index.func";

const Certificate = ({ id, open, setOpen }) => {
    const print = useRef();
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [ adopter, setAdopter ] = useState({});
    const { mutate: adptr } = usePost({ fetch: certificate, onSuccess: data => setAdopter(data) });
    
    useEffect(() => { if(id !== null && id !== undefined) { adptr({ id: id }); } }, [ id, adptr ]);

    return (
        <Dialog fullScreen= { fullscreen } open= { open } fullWidth maxWidth= "md" scroll= "paper">
            <DialogContent sx= {{ padding: '30px 50px' }}>
                <Stack direction= "column" justifyContent= "space-between" alignItems= "stretch" spacing= { 3 }>
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, padding: '20px' }} ref= { print } spacing= { 5 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                            <Stack direction= "row" justifyContent= "center" alignItems= "center" spacing= { 2 }>
                                <img src= { QC } alt= "qc-logo" width= "90px" height= "90px" />
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "center">
                                    <Typography sx= {{ fontStyle: 'italic', fontWeight: 'bold' }}>Republic of the Philippines</Typography>
                                    <Typography variant= "h5" sx= {{ fontWeight: 'bold' }}>CITY VETERINARY DEPARTMENT</Typography>
                                    <Typography variant= "h6">Quezon City, Metro Manila</Typography>
                                </Stack>
                                <img src= { CVD } alt= "qc-logo" width= "90px" height= "90px" />
                            </Stack>
                            <Stack direction= "column" justifyContent= "center" alignItems= "center">
                                <Typography variant= "body2">6th Flr. QC Hall Civic A Bldg., Elliptical, Diliman, QC | 
                                    Email Address: <span style= {{ textDecoration: 'underline' }}>qcvetdepartment@gmail.com</span> |
                                    Tel no.: 988-4242 loc.8036</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction= "column" justifyContent= "center" alignItems= "center">
                            <Typography variant= "h5" sx= {{ fontWeight: 'bold' }}>Certificate of Adoption</Typography>
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                            <Typography sx= {{ paddingLeft: '20px' }}>This certifies that <b>#{ adopter.series_no }</b>, a <b>{ adopter.category }</b>, 
                                has been adopted by <b>{ adopter.name }</b> on <b>{ adopter.date_evaluated }</b>.</Typography>
                            <Typography><b>#{ adopter.series_no }</b> is a <b>{ adopter.age }</b> <b>{ (adopter.gender)?.toUpperCase() }</b> <b>{ adopter.breed }</b>.
                                <b>{ adopter.name }</b> has agreed to provide a loving and responsible home for <b>#{ adopter.series_no }</b>. 
                                <b>#{ adopter.series_no }</b> will be provided with food, water, shelter, exercise, and medical care as needed.
                                By signing below, <b>{ adopter.name }</b> agrees to take full responsibility for <b>#{ adopter.series_no }</b>'s well-being and to comply with all applicable 
                                laws and regulations related to pet ownership.</Typography>
                            <Stack direction= "column" justifyContent= "center" alignItems= "center">
                                <img src= { adopter.photo !== undefined ? JSON.parse(adopter.photo) : '#' } alt= "pet" width= "320px" />
                            </Stack>
                        </Stack>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                            <Typography>Signature of Adopter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________________________</Typography>
                            <Typography>Processed by::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________________________</Typography>
                            <Typography>Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________________________</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 3 }>
                        <Typography sx= {{ cursor: 'pointer' }} onClick= { () => setOpen(false) }>Close</Typography>
                        <ReactToPrint documentTitle= "Certificate" content= { () => print.current } trigger= { () => <Typography sx= { btntxt }>Save as PDF or Print</Typography> } />
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default Certificate;