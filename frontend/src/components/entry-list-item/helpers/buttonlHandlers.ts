import {apiCalls} from "../../../services/api/apiOperations.ts";
import type {Dispatch, SetStateAction} from "react";
import type {IMeal} from "../../../models/meal/IMeal.ts";

export const buttonHandlers = {
    handleDelete: async (name:string,cb:Dispatch<SetStateAction<IMeal[]>>) =>{
        await apiCalls.deleteMeal(name)
        const updatedMeals = await apiCalls.getMeal()
        cb(updatedMeals)
    },
     handleEditCancel: (state:boolean,cb:Dispatch<SetStateAction<boolean>>) =>{
         cb(prevState => !prevState)
        console.log(state)
    },
    handleSave: async (cb1:Dispatch<SetStateAction<IMeal[]>>,cb2:Dispatch<SetStateAction<boolean>>) =>{

        const updatedMeals = await apiCalls.getMeal()
        cb1(updatedMeals)
        cb2(prevState => !prevState)
    }
}