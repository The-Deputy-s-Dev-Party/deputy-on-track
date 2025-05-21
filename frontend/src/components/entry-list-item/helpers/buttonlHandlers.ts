import {apiCalls} from "../../../services/api/apiOperations.ts";
import type {Dispatch, SetStateAction} from "react";
import type {IMeal} from "../../../models/meal/IMeal.ts";
import {apiEndpoints} from "../../../constants/constants.ts";

export const buttonHandlers = {
    handleDelete: async (id: number, callbackSetMeals: Dispatch<SetStateAction<IMeal[]>>, callbackSetHistoryMeals: Dispatch<SetStateAction<IMeal[]>>) => {
        await apiCalls.delete(`${apiEndpoints.food}/${id}`)
        const [updatedMeals, todayMeals] = await Promise.all([
            apiCalls.getData<IMeal[]>(apiEndpoints.food),
            apiCalls.getTodayMeals<IMeal[]>(apiEndpoints.foodByDate)

        ])
        callbackSetMeals(updatedMeals)
        callbackSetHistoryMeals(todayMeals)
    },
    handleToggleEdit: (callbackEditToggle: Dispatch<SetStateAction<boolean>>) => {
        callbackEditToggle(prevState => !prevState)
    },
    handleSave: async (callbackUpdateMeals: Dispatch<SetStateAction<IMeal[]>>, callbackSetHistoryMeals: Dispatch<SetStateAction<IMeal[]>>, callbackToggleEdit: Dispatch<SetStateAction<boolean>>) => {
        const [updatedMeals, todayMeals] = await Promise.all([
            apiCalls.getData<IMeal[]>(apiEndpoints.food),
            apiCalls.getTodayMeals<IMeal[]>(apiEndpoints.foodByDate)
        ])
        callbackUpdateMeals(updatedMeals)
        callbackSetHistoryMeals(todayMeals)
        callbackToggleEdit(prevState => !prevState)
    }
}
