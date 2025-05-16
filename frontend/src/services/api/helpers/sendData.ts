import type {IMeal} from "../../../models/meal/IMeal.ts";
import type {IEntryFormData} from "../../../models/entry-form-data/IEntryFormData.ts";
import {axiosInstance} from "../apiOperations.ts";
import log from "loglevel";

type AllowedAxiosMethods = 'post' | 'put' | 'patch';

export const sendData = async ({name, energy_kcal, consumed_amount}: IEntryFormData, method: AllowedAxiosMethods, url: string): Promise<IMeal | undefined> => {
    const kcal = Number(energy_kcal)
    const weight = Number(consumed_amount)

    if (isNaN(kcal)) {
        log.error(`Incorrect value kcal: ${kcal}`)
        return undefined
    }
    if (isNaN(weight)) {
        log.error(`Incorrect value weight: ${weight}`)
        return undefined
    }

    const response = await axiosInstance[method]<IMeal>(url, {
        name,
        energy_kcal: kcal,
        consumed_amount: weight
    })
    return response.data
}
