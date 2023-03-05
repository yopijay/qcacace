import * as Yup from 'yup';

export const validation = () => (
    Yup.object({
        color: Yup.string().required('This field is required!'),
        owner_contact_no: Yup.string().required('This field is required!'),
    })
)