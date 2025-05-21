import axios from "axios";
import {sendData} from "./helpers/sendData.ts";
import {AXIOS_URL} from "../../constants/constants.ts";

export const axiosInstance = axios.create({
    baseURL: AXIOS_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const apiCalls = {
    create: async <T, Response>(data: T, url: string): Promise<Response> => await sendData<T, Response>(data, 'post', url),
    getData: async <T>(url: string): Promise<T> => {
        const {data} = await axiosInstance.get<T>(url)
        return data
    },
    delete: async (url: string, id: number): Promise<number> => {
        await axiosInstance.delete(`${url}/${id}`)
        return id
    },
    update: async <T, Response>(data: T, url: string): Promise<Response> => await sendData<T, Response>(data, 'put', url),
    getTodayMeals: async <T>(url: string): Promise<T> => {
        const {data} = await axiosInstance.get<T>(url)
        return data
    }
}
