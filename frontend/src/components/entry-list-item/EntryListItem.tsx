import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../../redux/hooks/UseAppDispatch";
import {foodValidatorSchema, type IEntryFormData} from "../../validator/FoodValidator";
import type {IMeal} from "../../models/meal/IMeal";
import {foodSliceActions} from "../../redux/slices/food-slice/FoodSlice.ts";
import type {FC} from "react";

type Props = {
    item: IMeal;
};

export const EntryListItem: FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const [isEditable, setIsEditable] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IEntryFormData>({
        resolver: zodResolver(foodValidatorSchema),
        mode: "onChange"
    });

    const update = (formData: IEntryFormData) => {
        dispatch(foodSliceActions.updateMeal({data: formData, id: item.id}));
        setIsEditable(false);
    };

    const remove = () => {
        dispatch(foodSliceActions.deleteMeal(item.id));
    };

    return (
        !isEditable ? (
            <div className="item-container">
                {item.name} - {item.calories} - {item.weight} - {item.proteins} - {item.fats} - {item.carbohydrates}
                <div className="buttons">
                    <button onClick={() => setIsEditable(true)}>Edit</button>
                    <button onClick={remove}>Remove</button>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit(update)} className="item-container">
                <input type="text" {...register('name')} defaultValue={item.name}/> -
                <input type="number" {...register('calories', {
                    setValueAs: (val =>
                            val === '' ? undefined : Number(val)
                    )
                })} defaultValue={item.calories}/> -
                <input type="number" {...register('weight', {
                    setValueAs: (val =>
                            val === '' ? undefined : Number(val)
                    )
                })} defaultValue={item.weight}/> -
                <input type="number" {...register('proteins', {
                    setValueAs: (val =>
                            val === '' ? undefined : Number(val)
                    )
                })} defaultValue={item.proteins}/> -
                <input type="number" {...register('fats', {
                    setValueAs: (val =>
                            val === '' ? undefined : Number(val)
                    )
                })} defaultValue={item.fats}/> -
                <input type="number" {...register('carbohydrates', {
                    setValueAs: (val =>
                            val === '' ? undefined : Number(val)
                    )
                })} defaultValue={item.carbohydrates}/>
                <div className="buttons-edit-mode">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditable(false)}>Cancel</button>
                </div>
                <div>
                    {Object.values(errors).map(error => <p key={error?.message}>{error?.message}</p>)}
                </div>
            </form>
        )
    );
};
