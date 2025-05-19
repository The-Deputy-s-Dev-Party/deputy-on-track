import axios from "axios";
import type {IEntryFormData} from "../../models/entry-form-data/IEntryFormData.ts";
import type {IMeal} from "../../models/meal/IMeal.ts";
import {sendData} from "./helpers/sendData.ts";
import {AXIOS_URL} from "../../constants/constants.ts";

export const axiosInstance = axios.create({
    baseURL: AXIOS_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const apiCalls = {
    createEntry: async ({name, calories, weight,proteins,carbohydrates,fats}: IEntryFormData): Promise<IMeal | undefined> => {
               return await sendData({
                   name, calories, weight,proteins,carbohydrates,fats
               }, 'post', '/food')

    },
    getMeal: async (): Promise<IMeal[]> => {
        const {data} = await axiosInstance.get<IMeal[]>('/food')
        return data
    },
    deleteMeal: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/food/${id}`)
    },
    updateMeal: async ({name, calories, weight,proteins,carbohydrates,fats}: IEntryFormData, id: number): Promise<IMeal | undefined> => {
        return await sendData({
            name, calories, weight,proteins,carbohydrates,fats
        }, 'put', `/food/${id}`)
    }
}
