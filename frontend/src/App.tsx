import './App.css'
import {useState} from "react";
import type {IMeal} from "./models/meal/IMeal.ts";
import {apiCalls} from "./services/api/apiOperations.ts";
import {apiEndpoints} from "./constants/constants.ts";
import {EntryList} from "./components/entry-list/EntryList.tsx";
import {EntryForm} from "./components/entry-form/EntryForm.tsx";
import {TotalNutrition} from "./components/total-nutrition/TotalNutrition.tsx";

function App() {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [historyMeals, setHistoryMeals] = useState<IMeal[]>([]);
    const [isFetched, setIsFetched] = useState(false)

    const handleAddMeal = async () => {
        const updatedMeals = await apiCalls.getData<IMeal[]>(apiEndpoints.food);
        const todayMeals = await apiCalls.getTodayMeals<IMeal[]>(apiEndpoints.foodByDate)
        setMeals(updatedMeals);
        setHistoryMeals(todayMeals);
    };
    if (meals.length === 0 && !isFetched) {
        handleAddMeal()
        setIsFetched(true)
    }

    return (
        <div>
            <div className={'container'}>
                <EntryForm onAddMeal={handleAddMeal}/>
                <EntryList meals={meals} setMeals={setMeals} setHistoryMeals={setHistoryMeals}/>
            </div>
            <TotalNutrition historyMeals={historyMeals}/>
        </div>
    )
}

export default App
