// Libraries
import { createContext, useState } from "react";

export const PreviewCntxt = createContext();

export const PreviewPrvdr = (props) => {
    const { children } = props;
    const [ data, setData ] = useState([]);
    const [ loader, setLoader ] = useState(false);

    return <PreviewCntxt.Provider value= {{ data, setData, loader, setLoader }}>{ children }</PreviewCntxt.Provider>
}