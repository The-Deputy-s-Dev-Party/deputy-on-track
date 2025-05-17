import type {IMeal} from "../../models/meal/IMeal.ts";
import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import {apiCalls} from "../../services/api/apiOperations.ts";
import {useForm} from "react-hook-form";
import type {IEntryFormData} from "../../models/entry-form-data/IEntryFormData.ts";
import {buttonHandlers} from "./helpers/buttonlHandlers.ts";

type Props = {
    item:IMeal,
    setMeals:Dispatch<SetStateAction<IMeal[]>>
}

export const EntryListItem:FC<Props> = ({item,setMeals}) => {
    const {register,handleSubmit} = useForm<IEntryFormData>()
    const [isEditable, setIsEditable] = useState(false)
    
    const update = async (formData:IEntryFormData) => {
        if(await apiCalls.updateMeal(formData,item.id)===undefined){
            return
        }
        buttonHandlers.handleSave(setMeals,setIsEditable)
    }

    return (
        !isEditable ? (
            <div className={'item-container'}>
                {item.name} - {item.weight} - {item.calories} - {item.proteins} - {item.fats} - {item.carbohydrates}
                <div className={'buttons'}>
                    <button onClick={() => buttonHandlers.handleToggleEdit(setIsEditable)}>Edit</button>
                    <button onClick={() => buttonHandlers.handleDelete(item.id,setMeals)}>Remove</button>
                </div>
            </div>
        ): (
            <div className={'item-container'}>
                <input type="text" {...register('name')} defaultValue={item.name}/> -
                <input type="text" {...register('weight')} defaultValue={item.weight}/> -
                <input type="text" {...register('calories')} defaultValue={item.calories}/>
                <input type="text" {...register('proteins')} defaultValue={item.proteins}/>
                <input type="text" {...register('fats')} defaultValue={item.fats}/>
                <input type="text" {...register('carbohydrates')} defaultValue={item.carbohydrates}/>
                <div className={'buttons-edit-mode'}>
                    <form onSubmit={handleSubmit(update)}>
                        <button>Save</button>
                    </form>
                    <button onClick={()=>buttonHandlers.handleToggleEdit(setIsEditable)}>Cancel</button>
                </div>
            </div>
        )

    );
};
