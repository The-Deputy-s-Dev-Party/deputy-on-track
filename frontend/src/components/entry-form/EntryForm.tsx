import {useForm} from "react-hook-form";
import type {IEntryFormData} from "../../models/entry-form-data/IEntryFormData.ts";
import {apiCalls} from "../../services/api/apiOperations.ts";

type Props = {
    onAddMeal: () => void;
};

export const EntryForm = ({onAddMeal}: Props) => {
    const {register, handleSubmit, reset} = useForm<IEntryFormData>();

    const onSubmit = async (formData: IEntryFormData) => {
        console.log(formData)
        if (await apiCalls.createEntry(formData) === undefined) {
            return
        }
        onAddMeal();
        reset();
    };
    return (
        <div className={'form-container'}>
            <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Enter meal
                    <input type="text" {...register('name')}/>
                </label>
                <label>
                    Enter weight
                    <input type="number" {...register('weight')}/>
                </label>

                <label>
                    Enter calories
                    <input type="text" {...register('calories')}/>
                </label>

                <label>
                    Enter proteins
                    <input type="text" {...register('proteins')}/>
                </label>

                <label>
                    Enter fats
                    <input type="text" {...register('fats')}/>
                </label>

                <label>
                    Enter carbohydrates
                    <input type="text" {...register('carbohydrates')}/>
                </label>

                <button> Add food</button>
            </form>
        </div>
    );
};
