import {apiCalls} from "../../../services/api/apiOperations.ts";
import type {Dispatch, SetStateAction} from "react";
import type {IMeal} from "../../../models/meal/IMeal.ts";
import {apiEndpoint} from "../../../constants/constants.ts";

export const buttonHandlers = {
    handleDelete: async (id:number,callbackSetMeals: Dispatch<SetStateAction<IMeal[]>>) => {
        await apiCalls.delete(`${apiEndpoint}/${id}`)
        const updatedMeals = await apiCalls.getData<IMeal[]>(apiEndpoint)
        callbackSetMeals(updatedMeals)
    },
    handleToggleEdit: ( callbackEditToggle:
        Dispatch<SetStateAction<boolean>>) => {
        callbackEditToggle(prevState => !prevState)
    },
    handleSave: async (callbackUpdateMeals: Dispatch<SetStateAction<IMeal[]>>, callbackToggleEdit: Dispatch<SetStateAction<boolean>>) => {

        const updatedMeals = await apiCalls.getData<IMeal[]>(apiEndpoint)
        callbackUpdateMeals(updatedMeals)
        callbackToggleEdit(prevState => !prevState)
    }
}
