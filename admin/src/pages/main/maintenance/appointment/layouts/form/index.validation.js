import * as Yup from 'yup';
export const validation = () => ( Yup.object({ slot: Yup.string().required('This field is required!'), }) )