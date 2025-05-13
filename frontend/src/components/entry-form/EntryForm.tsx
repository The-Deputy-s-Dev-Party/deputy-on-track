import {useForm} from "react-hook-form";
import type {IEntryFormData} from "../../models/entry-form-data/IEntryFormData.ts";
import {apiCalls} from "../../services/api/apiOperations.ts";



export const EntryForm = () => {

    const {register,handleSubmit,reset} = useForm<IEntryFormData>()
    const onSubmit = async (formData:IEntryFormData) => {
    console.log(formData)
        await apiCalls.createEntry(formData)
        reset()
    }
    return (
        <div>
            <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Enter meal
                    <input type="text" {...register('name')}/>
                </label>
                <label>
                    Enter kkal
                    <input type="number" {...register('energy_kcal')}/>
                </label>
                <label>
                    Enter weight
                    <input type="number" {...register('consumed_amount')}/>
                </label>
                <button> Add food</button>
            </form>
        </div>
    );
};

export default EntryForm;