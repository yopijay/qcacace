// Libraries
import { createContext, useState } from "react";

export const ProfileCntxt = createContext();

export const ProfilePrvdr = (props) => {
    const { children } = props;
    const [ data, setData ] = useState([]);
    const [ loader, setLoader ] = useState(true);

    return <ProfileCntxt.Provider value= {{ data, setData, loader, setLoader }}>{ children }</ProfileCntxt.Provider>
}