import * as Yup from 'yup';

export const verification = () => ( Yup.object({ email: Yup.string().required('This field is required!').email('Invalid email format!') }) );

export const personalinformation = () => (
    Yup.object({
        fname: Yup.string().required('This field is required!').nullable(),
        lname: Yup.string().required('This field is required!').nullable(),
        contact_no: Yup.string().required('This field is required!').matches(/^[0-9]*$/, 'Numbers only')
    })
)