// Libraries
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";

const ValidId = ({ fetching, docs }) => {

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
            <Typography gutterBottom sx={{ fontWeight:'600'}}>*Applicant 1X1 picture</Typography>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
            { fetching ? <Skeleton variant= "rounded" sx= {{ width: '100%', height: '200px' }} /> :
                <Stack direction= "row" justifyContent= "center" alignItems= "center" 
                    sx= {{ backgroundColor: '#e0e0e0', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                    <Avatar src= { JSON.parse(docs[0].picture) } variant= "square" sx= {{ width: 'auto', height: '100%' }} />
                </Stack> }
            </Stack>
        </Stack>
    );
}

export default ValidId;