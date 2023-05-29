import * as Yup from 'yup';

export const personalinformation = () => (
    Yup.object({
        email: Yup.string().email('Invalid format!').required('This field is required!'),
        fname: Yup.string().required('This field is required!'),
        lname: Yup.string().required('This field is required!')
    })
)