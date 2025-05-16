import {apiCalls} from "../../../services/api/apiOperations.ts";
import type {Dispatch, SetStateAction} from "react";
import type {IMeal} from "../../../models/meal/IMeal.ts";

export const buttonHandlers = {
    handleDelete: async (name: string, callbackSetMeals: Dispatch<SetStateAction<IMeal[]>>) => {
        await apiCalls.deleteMeal(name)
        const updatedMeals = await apiCalls.getMeal()
        callbackSetMeals(updatedMeals)
    },
    handleToggleEdit: ( callbackEditToggle:
        Dispatch<SetStateAction<boolean>>) => {
        callbackEditToggle(prevState => !prevState)
    },
    handleSave: async (callbackUpdateMeals: Dispatch<SetStateAction<IMeal[]>>, callbackToggleEdit: Dispatch<SetStateAction<boolean>>) => {

        const updatedMeals = await apiCalls.getMeal()
        callbackUpdateMeals(updatedMeals)
        callbackToggleEdit(prevState => !prevState)
    }
}
