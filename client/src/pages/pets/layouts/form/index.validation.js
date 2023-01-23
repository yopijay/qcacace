import * as Yup from 'yup';

export const verification = () => ( Yup.object({ email: Yup.string().required('This field is required!').email('Invalid email format!') }) );