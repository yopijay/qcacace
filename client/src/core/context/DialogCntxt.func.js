// Libraries
import { createContext, useState } from "react";

export const DialogCntxt = createContext();

export const DialogPrvdr = (props) => {
    const { children } = props;
    const [ open, setOpen ] = useState(false);
    const [ id, setId ] = useState();

    return <DialogCntxt.Provider value= {{ open, setOpen, id, setId }}>{ children }</DialogCntxt.Provider>
}