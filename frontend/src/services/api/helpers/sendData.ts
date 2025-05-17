import type {IMeal} from "../../../models/meal/IMeal.ts";
import type {IEntryFormData} from "../../../models/entry-form-data/IEntryFormData.ts";
import {axiosInstance} from "../apiOperations.ts";
import log from "loglevel";

type AllowedAxiosMethods = 'post' | 'put' | 'patch';

export const sendData = async ({
                                   name,
                                   calories,
                                   weight,
                                   proteins,
                                   carbohydrates,
                                   fats
                               }: IEntryFormData, method: AllowedAxiosMethods, url: string): Promise<IMeal | undefined> => {
    const kcal = Number(calories)
    const weightValue = Number(weight)
    const proteinsValue = Number(proteins)
    const carbohydratesValue = Number(carbohydrates)
    const fatsValue = Number(fats)

    if (isNaN(kcal)) {
        log.error(`Incorrect value kcal: ${kcal}`)
        return undefined
    }
    if (isNaN(weight)) {
        log.error(`Incorrect value weight: ${weightValue}`)
        return undefined
    }
    if (isNaN(kcal)) {
        log.error(`Incorrect value kcal: ${proteinsValue}`)
        return undefined
    }
    if (isNaN(weight)) {
        log.error(`Incorrect value weight: ${carbohydratesValue}`)
        return undefined
    }
    if (isNaN(weight)) {
        log.error(`Incorrect value weight: ${fatsValue}`)
        return undefined
    }

    const response = await axiosInstance[method]<IMeal>(url, {
        name, calories, weight, proteins, carbohydrates, fats
    })
    return response.data
}
