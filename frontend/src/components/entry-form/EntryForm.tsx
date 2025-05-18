import {useForm} from "react-hook-form";
import {apiCalls} from "../../services/api/apiOperations.ts";
import {foodValidatorSchema, type IEntryFormData} from "../../validator/FoodValidator.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import type {IMeal} from "../../models/meal/IMeal.ts";
import {apiEndpoint} from "../../constants/constants.ts";

type Props = {
    onAddMeal: () => void;
};


export const EntryForm = ({onAddMeal}: Props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<IEntryFormData>({resolver: zodResolver(foodValidatorSchema), mode: "onBlur"});

    const onSubmit = async (formData: IEntryFormData) => {
        console.log(formData)
        if (await apiCalls.create<IEntryFormData,IMeal>(formData,apiEndpoint) === undefined) {
            return
        }
        onAddMeal();
        reset();
    };
    return (
        <div className={'form-container'}>
            <form className={'form'} onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label>
                        Enter name
                        <input type="text" {...register('name')}/>
                    </label>
                    {errors.name && <p>{errors.name?.message}</p>}
                </div>

                <div>
                    <label>
                        Enter calories
                        <input type="text" {...register('calories', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })}/>
                    </label>
                    {errors.calories && <p>{errors.calories?.message}</p>}
                </div>

                <div>
                    <label>
                        Enter weight
                        <input type="number" {...register('weight', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })}/>
                    </label>
                    {errors.weight && <p>{errors.weight?.message}</p>}
                </div>

                <div>
                    <label>
                        Enter proteins
                        <input type="number" {...register('proteins', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })}/>
                    </label>
                    {errors.proteins && <p>{errors.proteins?.message}</p>}
                </div>

                <div>
                    <label>
                        Enter fats
                        <input type="number" {...register('fats', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })}/>
                    </label>
                    {errors.fats && <p>{errors.fats?.message}</p>}
                </div>

                <div>
                    <label>
                        Enter carbohydrates
                        <input type="number" {...register('carbohydrates', {
                            setValueAs: (val =>
                                    val === '' ? undefined : Number(val)
                            )
                        })}/>
                    </label>
                    {errors.carbohydrates && <p>{errors.carbohydrates?.message}</p>}
                </div>

                <button> Add food</button>
            </form>
        </div>
    );
};
