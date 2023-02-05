import { Stack, Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";

// Core
import { FormCntxt } from "core/context/FormCntxt.func"; // Context
import { successToast, usePost } from "core/global/function/index.func"; // Function
import { resend } from "core/api/index.func"; // API

const Index = ({ timer, setTimer }) => { 
    const ref = useRef();
    const { handleSubmit, setValue } = useContext(FormCntxt);
    const { mutate: rsnd } = 
        usePost({ fetch: resend, 
            onSuccess: data => { 
                if(data.result === 'success') { 
                    clearTimer(getDeadTime());
                    [0, 1, 2, 3, 4, 5].forEach(field => setValue(`code${field+1}`, ''));
                    successToast(data.message, 3000); 
                } 
            } 
        });

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);

        return { total, minutes, seconds }
    }

    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e);
        if(total >= 0) { setTimer(`${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`) }
    }

    const clearTimer = (e) => {
        setTimer('03:00');

        if(ref.current) clearInterval(ref.current);
        const id = setInterval(() => { startTimer(e); }, 1000);

        ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 180);
        return deadline;
    }

    useEffect(() => { clearTimer(getDeadTime());}, []);

    return (
        <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
            <Typography>Didn`t get the code?</Typography>
            { timer !== '00:00' ? <Typography sx= {{ textDecoration: 'none', color: '#1b4168', cursor: 'pointer' }}>{ timer }</Typography> : 
                <Typography sx= {{ textDecoration: 'none', color: '#1b4168', cursor: 'pointer' }} onClick= { handleSubmit(data => rsnd(data) ) }>Resend</Typography>}
        </Stack>
    );
}

export default Index;