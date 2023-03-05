import * as Yup from 'yup';
export const validation = () => ( Yup.object({ email: Yup.string().email('Invalid email format!').required('This field is required!'), }) )