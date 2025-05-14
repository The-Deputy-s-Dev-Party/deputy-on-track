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
    createEntry: async ({ name, energy_kcal, consumed_amount }: IEntryFormData): Promise<IMeal> => {
        const response = await axiosInstance.post<IMeal>('/entries', {
            name,
            energy_kcal: Number(energy_kcal),
            consumed_amount: Number(consumed_amount),
        });
        return response.data;
    },
    getMeal: async ():Promise<IMeal[]>=>{
         const {data} =  await axiosInstance.get<IMeal[]>('/entries')
            return data
    },
    deleteMeal: async (name:string):Promise<void> =>{
        await axiosInstance.delete(`/entries/${name}`,)
    },
    updateMeal: async ({ name, energy_kcal, consumed_amount }: IEntryFormData,title:string):Promise<IMeal> =>{
        const response = await axiosInstance.put(`/entries/${title}`,{
            name,
            energy_kcal: Number(energy_kcal),
            consumed_amount: Number(consumed_amount),
        })
        return response.data
    }
}