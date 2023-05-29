import * as Yup from 'yup';

export const validation = () => (
    Yup.object({
        color: Yup.string().required('This field is required!'),
        email: Yup.string().email(`Invalid email format!`).required('This field is required!'),
        fname: Yup.string().required('This field is required!'),
        lname: Yup.string().required('This field is required!'),
        reason: Yup.string().required('This field is required!'),
    })
)