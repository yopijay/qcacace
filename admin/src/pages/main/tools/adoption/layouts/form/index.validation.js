import * as Yup from 'yup';

export const validation = () => (
    Yup.object({
        // email: Yup.string().email('Invalid email format!').required('This field is required!'),
        // contact_no: Yup.string().required(`This field is required!`),
        // fname: Yup.string().required(`This field is required!`),
        // lname: Yup.string().required(`This field is required!`),
        // age: Yup.string().required(`This field is required!`),
        // size: Yup.string().required(`This field is required!`),
        // color: Yup.string().required(`This field is required!`),
    })
)