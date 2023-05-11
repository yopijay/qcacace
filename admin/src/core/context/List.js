// Libraries
import { createContext, useState } from "react";

export const ListCntxt = createContext();

export const ListPrvdr = (props) => {
    const { children } = props;
    const [ list, setList ] = useState([]);
    const [ xlsx, setXlsx ] = useState([]);

    return <ListCntxt.Provider value= {{ list, setList, xlsx, setXlsx }}>{ children }</ListCntxt.Provider>
}