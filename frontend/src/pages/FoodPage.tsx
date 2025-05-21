import {useEffect} from "react";
import {EntryForm} from "../components/entry-form/EntryForm.tsx";
import {EntryList} from "../components/entry-list/EntryList.tsx";
import {TotalNutrition} from "../components/total-nutrition/TotalNutrition.tsx";
import {useAppSelector} from "../redux/hooks/UseAppSelector.tsx";
import {useAppDispatch} from "../redux/hooks/UseAppDispatch.tsx";
import {foodSliceActions} from "../redux/slices/food-slice/FoodSlice.ts";
import type {IEntryFormData} from "../validator/FoodValidator.ts";

const FoodPage = () => {
    const dispatch = useAppDispatch();
    const {meals, todayMeals, isFetched} = useAppSelector(({foodSlice}) => foodSlice);

    useEffect(() => {
        if (!isFetched) {
            dispatch(foodSliceActions.loadFood());
            dispatch(foodSliceActions.loadTodayFood());
        }
    }, [dispatch, isFetched]);

    const handleAddMeal = async (formData: IEntryFormData) => {
        await dispatch(foodSliceActions.addMeal(formData));
    };

    return (
        <div>
            <div className={'container'}>
                <EntryForm onAddMeal={handleAddMeal}/>
                <EntryList meals={meals}/>
            </div>
            <TotalNutrition todayMeals={todayMeals}/>
        </div>
    );
};

export default FoodPage;
