// Libraries
import { yupResolver } from "@hookform/resolvers/yup";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const FormCntxt = createContext();

export const FormPrvdr = (props) => {
    const { type } = useParams();
    const { children } = props;
    const [ fields, setFields ] = useState({});
    const [ disabled, setDisabled ] = useState(false);
    const [ check, setCheck ] = useState(true);
    const [ loader, setLoader ] = useState(type !== 'new');
    const [ validation, setValidation ] = useState({});
    const [ series, setSeries ] = useState();

    const { register, handleSubmit, formState: { errors }, getValues, setValue, setError, control, clearErrors, setFocus } = useForm({
        resolver: Object.keys(validation).length === 0 ? '' : yupResolver(validation)
    });

    return (
        <FormCntxt.Provider 
            value= {{ fields, setFields, disabled, setDisabled, setValidation, register, handleSubmit, errors, getValues, setValue, setError, check, setCheck,
                            loader, setLoader, control, clearErrors, series, setSeries, setFocus }}>
            { children }
        </FormCntxt.Provider>
    );
}