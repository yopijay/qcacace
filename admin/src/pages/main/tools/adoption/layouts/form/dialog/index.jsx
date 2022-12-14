// Libraries
import { QrReader } from "react-qr-reader";

// Core
import { scan } from "core/api/index.func"; // APIs
import { usePost } from "core/global/function/index.func"; // Custom react query

const Index = (props) => {
    const { setValue, setOpen } = props;
    const { mutate: scanner } = usePost(scan, (data) => {
        setValue('pet.series_no', data.series_no);
        setValue('pet.name', data.name);
        setValue('pet.category_id', data.category_id);
        setValue('pet.breed_id', data.breed_id);
        setValue('pet.gender', data.gender);
        setValue('pet.age', data.age);
        setValue('pet.size', data.size);
        setValue('pet.color', data.color);

        setOpen(false);
    });
    return (
        <QrReader scanDelay= { 3000 } containerStyle= {{ width: '100%', height: '100%' }} videoStyle= {{ width: '100%', height: '100%' }} videoContainerStyle= {{ facingMode: 'environment' }}
            onResult= { async (result, error) => {
                if(!!result) { scanner({ table: 'tbl_pets', data: { series_no: result.text } }) }
                if(!!error) console.info(error);
            }} />
    );
}

export default Index;