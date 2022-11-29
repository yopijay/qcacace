// Libraries
import { createContext, useState } from "react";

export const DropdownCntxt = createContext();

export const DropdownPrvdr = (props) => {
    const { children } = props;
    const [ owner, setOwner ] = useState([]);
    const [ ownerLoader, setOwnerloader ] = useState(false);
    const [ company, setCompany ] = useState([]);
    const [ companyLoader, setCompanyloader ] = useState(false);
    const [ department, setDepartment ] = useState([]);
    const [ departmentLoader, setDepartmentloader ] = useState(false);
    const [ position, setPosition ] = useState([]);
    const [ positionLoader, setPositionloader ] = useState(false);
    const [ supervisor, setSupervisor ] = useState([]);
    const [ supervisorLoader, setSupervisorloader ] = useState(false);

    return <DropdownCntxt.Provider 
                    value= {{ company, setCompany, department, setDepartment, position, setPosition, owner, setOwner,
                                    ownerLoader, setOwnerloader, companyLoader, setCompanyloader, departmentLoader, setDepartmentloader,
                                    positionLoader, setPositionloader, supervisor, setSupervisor, supervisorLoader, setSupervisorloader }}>{ children }</DropdownCntxt.Provider>
}