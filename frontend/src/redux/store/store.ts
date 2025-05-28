import {configureStore} from "@reduxjs/toolkit";
import {foodSlice} from "../slices/food-slice/FoodSlice.ts";

export const store = configureStore({
    reducer: {
        foodSlice: foodSlice.reducer
    }
})
