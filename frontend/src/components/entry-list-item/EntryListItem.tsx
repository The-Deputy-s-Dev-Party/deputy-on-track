import type {IMeal} from "../../models/meal/IMeal.ts";
import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import {apiCalls} from "../../services/api/apiOperations.ts";
import {useForm} from "react-hook-form";
import {buttonHandlers} from "./helpers/buttonlHandlers.ts";
import {foodValidatorSchema, type IEntryFormData} from "../../validator/FoodValidator.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {apiEndpoint} from "../../constants/constants.ts";

type Props = {
    item:IMeal,
    setMeals:Dispatch<SetStateAction<IMeal[]>>
}


export const EntryListItem:FC<Props> = ({item,setMeals}) => {
    const {register,handleSubmit,formState:{errors}} = useForm<IEntryFormData>({resolver:zodResolver(foodValidatorSchema), mode: "onChange"})
    const [isEditable, setIsEditable] = useState(false)

    const update = async (formData:IEntryFormData) => {
        if(await apiCalls.update<IEntryFormData,IMeal>(formData,`${apiEndpoint}/${item.id}`)===undefined){
            return
        }
        buttonHandlers.handleSave(setMeals,setIsEditable)
    }

    return (
        !isEditable ? (
            <div className={'item-container'}>
                {item.name} - {item.calories} - {item.weight} - {item.proteins} - {item.fats} - {item.carbohydrates}
                <div className={'buttons'}>
                    <button onClick={() => buttonHandlers.handleToggleEdit(setIsEditable)}>Edit</button>
                    <button onClick={() => buttonHandlers.handleDelete(item.id,setMeals)}>Remove</button>
                </div>
            </div>
        ): (
            <div>
                <div className={'item-container'}>
                    <div>
                        <input type="text" {...register('name')} defaultValue={item.name}/> -
                        <input type="text" {...register('calories', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })} defaultValue={item.calories}/> -
                        <input type="text" {...register('weight', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })} defaultValue={item.weight}/> -
                        <input type="text" {...register('proteins', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })} defaultValue={item.proteins}/> -
                        <input type="text" {...register('fats', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })} defaultValue={item.fats}/> -
                        <input type="text" {...register('carbohydrates', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })} defaultValue={item.carbohydrates}/>
                    </div>

                    <div className={'buttons-edit-mode'}>
                        <form onSubmit={handleSubmit(update)}>
                            <button>Save</button>
                        </form>
                        <button onClick={() => buttonHandlers.handleToggleEdit(setIsEditable)}>Cancel</button>
                    </div>
                </div>
                <div>
                    {errors.name && <p>{errors.name?.message}</p>}
                    {errors.weight && <p>{errors.weight?.message}</p>}
                    {errors.calories && <p>{errors.calories?.message}</p>}
                    {errors.proteins && <p>{errors.proteins?.message}</p>}
                    {errors.fats && <p>{errors.fats?.message}</p>}
                    {errors.carbohydrates && <p>{errors.carbohydrates?.message}</p>}
                </div>
            </div>
        )

    );
};
