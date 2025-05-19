import './App.css'
import {useState} from "react";
import type {IMeal} from "./models/meal/IMeal.ts";
import {apiCalls} from "./services/api/apiOperations.ts";
import {EntryForm} from "./components/entry-form/EntryForm.tsx";
import {EntryList} from "./components/entry-list/EntryList.tsx";
import {apiEndpoint} from "./constants/constants.ts";

function App() {
    const [meals, setMeals] = useState<IMeal[]>([]);
    const [isFetched, setIsFetched] = useState(false)
    const handleAddMeal = async () => {
        const updatedMeals = await apiCalls.getData<IMeal[]>(apiEndpoint);
        setMeals(updatedMeals);
    };
    if (meals.length === 0 && !isFetched) {
        setIsFetched(true)
        handleAddMeal()
    }

    return (
        <div className={'container'}>
            <EntryForm onAddMeal={handleAddMeal}/>
            <EntryList meals={meals} setMeals={setMeals}/>
        </div>
    )
}

export default App
