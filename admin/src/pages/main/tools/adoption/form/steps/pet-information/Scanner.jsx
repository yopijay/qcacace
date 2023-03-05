// Libraries
import { Stack } from "@mui/material";
import { successToast } from "core/global/function/index.func";
import { QrReader } from 'react-qr-reader';

const Scanner = ({ setPet }) => {

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%', height: '100vh' }}>
            <QrReader scanDelay= { 3000 } containerStyle= {{ width: '100%', height: '100%' }} videoStyle= {{ width: '100%', height: '100%' }}
                videoContainerStyle= {{ width: '100%', height: '100%' }} constraints= {{ facingMode: 'user' }}
                onResult= { async (result) => { if(!!result) { setPet(result?.text); successToast('Successfully scanned!', 3000); } } } />
        </Stack>
    );
}

export default Scanner;