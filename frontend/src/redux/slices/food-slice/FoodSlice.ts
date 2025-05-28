import type {IMeal} from "../../../models/meal/IMeal.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiCalls} from "../../../services/api/apiOperations.ts";
import type {IEntryFormData} from "../../../validator/FoodValidator.ts";
import {apiEndpoints} from "../../../constants/constants.ts";


type FoodSliceType = {
    meals: IMeal[],
    todayMeals: IMeal[],
}

const foodInitialState: FoodSliceType = {meals: [], todayMeals: []}

const loadFood = createAsyncThunk<IMeal[]>(
    'foodSlice/loadFood',
    async () => await apiCalls.getData<IMeal[]>(apiEndpoints.food)
)

const loadTodayFood = createAsyncThunk<IMeal[]>(
    'foodSlice/loadTodayFood',
    async (): Promise<IMeal[]> => await apiCalls.getTodayMeals<IMeal[]>(apiEndpoints.food)
)

const addMeal = createAsyncThunk<IMeal, IEntryFormData>(
    'foodSlice/addMeal',
    async (newMeal) => await apiCalls.create<IEntryFormData, IMeal>(newMeal, apiEndpoints.food)
)


const deleteMeal = createAsyncThunk<number, number>(
    'foodSlice/deleteMeal',
    async (id) => {
        await apiCalls.delete(apiEndpoints.food, id)
        return id
    }
)

const updateMeal = createAsyncThunk<IMeal, { data: IEntryFormData, id: number }>(
    "foodSlice/updateMeal",
    async ({data, id}) => await apiCalls.update<IEntryFormData, IMeal>(data, `${apiEndpoints.food}/${id}`)
)

export const foodSlice = createSlice({
    name: 'foodSlice',
    initialState: foodInitialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(loadFood.fulfilled, (state, action) => {
            state.meals = action.payload
        })
            .addCase(loadTodayFood.fulfilled, (state, action) => {
                state.todayMeals = action.payload
            })
            .addCase(addMeal.fulfilled, (state, action) => {
                state.meals.push(action.payload)
            })
            .addCase(deleteMeal.fulfilled, (state, action) => {
                const id = action.payload
                state.meals = state.meals.filter(meal => meal.id !== id)
                state.todayMeals = state.todayMeals.filter(meal => meal.id !== id)
            })
            .addCase(updateMeal.fulfilled, (state, action) => {
                const updatedMeal = action.payload;
                const id = updatedMeal.id;

                const mealIndex = state.meals.findIndex(meal => meal.id === id);
                if (mealIndex !== -1) {
                    state.meals[mealIndex] = updatedMeal;
                }

                const todayMealIndex = state.todayMeals.findIndex(meal => meal.id === id);
                if (todayMealIndex !== -1) {
                    state.todayMeals[todayMealIndex] = updatedMeal;
                }
            })
})

export const foodSliceActions = {
    ...foodSlice.actions, loadFood, loadTodayFood, addMeal, deleteMeal, updateMeal
}
