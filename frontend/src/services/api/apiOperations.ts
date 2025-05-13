import axios from "axios";
import type {IEntryFormData} from "../../models/entry-form-data/IEntryFormData.ts";
import type {IMeal} from "../../models/meal/IMeal.ts";

export const axiosInstance= axios.create({
    baseURL:`http://localhost:${import.meta.env.VITE_BACKEND_SERVER_PORT}`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const apiCalls=  {
     createEntry: async({name,energy_kcal,consumed_amount}:IEntryFormData) =>{
         await axiosInstance.post<IEntryFormData>('/entries', {consumed_amount:Number(consumed_amount),energy_kcal:Number(energy_kcal),name})
    },
    getMeat: async ():Promise<IMeal[]>=>{
         const {data} =  await axiosInstance.get<IMeal[]>('/entries')
            return data
    }
}