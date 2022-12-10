// Libraries
import { createContext, useState } from "react";

export const GlobalCntxt = createContext();

export const GlobalPrvdr = (props) => {
    const { children, window } = props;
    const [ open, setOpen ] = useState({ left: false });
    const [ dark, setDark ] = useState(false);
    const [ category, setCategory ] = useState('dog');
    const [ isActive, setIsActive ] = useState(localStorage.getItem('nav'));
    
    const drawerToggle = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        setOpen({ left: open });
    }
    
    const container = window !== undefined ? () => window().document.body : undefined;

    return <GlobalCntxt.Provider value= {{ open, drawerToggle, container, dark, setDark, isActive, setIsActive, setOpen, category, setCategory }}>{ children }</GlobalCntxt.Provider>
}