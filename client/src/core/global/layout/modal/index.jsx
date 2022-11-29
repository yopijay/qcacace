// Libraries
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import { forwardRef, lazy, Suspense, useContext } from "react";
import { useTheme } from "@emotion/react";

// Core
import Global from 'core/components'; // Components
import { SnakeLoader } from "core/global/layout/loader/Loader"; // Loader

// Constants
import { header } from "./index.style"; // Design

// Context
import { DialogCntxt } from "core/context/DialogCntxt.func"; // Context
import { PreviewPrvdr } from "core/context/PreviewCntxt.func"; // Provider

const Index = forwardRef((props, ref) => {
    const { title= '', width= 'md', fs= 'sm', form, type, action } = props;
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down(fs));
    const { open } = useContext(DialogCntxt);
    const Form = lazy(() => import(`./${type}/${form}`));

    return (
        <Dialog open= { open } maxWidth= { width } fullScreen= { fullscreen } fullWidth>
            <DialogTitle><Global.Typography text= { title } variant= "body1" sx= { header } /></DialogTitle>
            <DialogContent sx= {{ '&::-webkit-scrollbar': { display: 'none' } }}>
                <Suspense fallback= { <Global.Box.Row sx= {{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '10px 0' }}>
                                                        <SnakeLoader bg= "#b2bec3" size= "7px" distance= "7px" />
                                                    </Global.Box.Row> }><PreviewPrvdr><Form ref= { ref } /></PreviewPrvdr></Suspense>
            </DialogContent>
            <DialogActions sx= {{ padding: '16px 20px' }}>{ action }</DialogActions>
        </Dialog>
    );
})

export default Index;