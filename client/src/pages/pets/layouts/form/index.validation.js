import * as Yup from 'yup';

export const verification = () => ( Yup.object({ email: Yup.string().required('This field is required!').email('Invalid email format!') }) );

export const personalinformation = () => (
    Yup.object({
        fname: Yup.string().required('This field is required!'),
        lname: Yup.string().required('This field is required!'),
        contact_no: Yup.number('Numbers only').required('This field is required!')
    })
)