import {zod} from "../../zodAllias.ts";


export const foodValidatorSchema = zod.object({
    name: zod.string()
        .nonempty('Name is required')
        .min(3, "Name should be at least 3 chars long")
        .max(12, "Name shouldn't be more than 12 chars long"),
    calories: zod.number({
        required_error: "Calories is required",
        invalid_type_error: "Only numbers are allowed"
    })
        .min(0, "Calories should be more then 0")
        .max(2000, "Calories should be less then 2000"),
    weight: zod.number({
        required_error: "Weight is required",
        invalid_type_error: "Only numbers are allowed"
    })
        .min(0, "Weight should be more then 0")
        .max(2000, "Weight should be less then 2000"),
    proteins: zod.number({
        required_error: "Proteins is required",
        invalid_type_error: "Only numbers are allowed"
    })
        .min(0, "Proteins should be more then 0")
        .max(2000, "Proteins should be less then 2000"),
    fats: zod.number({
        required_error: "Fats is required",
        invalid_type_error: "Only numbers are allowed"
    })
        .min(0, "Fats should be more then 0")
        .max(2000, "Fats should be less then 2000"),
    carbohydrates: zod.number({
        required_error: "Carbohydrates is required",
        invalid_type_error: "Only numbers are allowed"
    })
        .min(0, "Carbohydrates should be more then 0")
        .max(2000, "Carbohydrates should be less then 2000"),
}).required()

export type IEntryFormData = zod.infer<typeof foodValidatorSchema>;
