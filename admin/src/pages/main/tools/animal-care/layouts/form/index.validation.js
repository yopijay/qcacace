import * as Yup from 'yup';

export const validation = () => (
    Yup.object({
        title: Yup.string().required('This field is required!'),
        description: Yup.string().required('This field is required!'),
    })
)