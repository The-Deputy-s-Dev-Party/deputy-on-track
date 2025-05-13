import {useEffect, useState} from "react";
import type {IMeal} from "../../models/meal/IMeal.ts";
import {apiCalls} from "../../services/api/apiOperations.ts";

export const EntryList = () => {
   const [meals,setMeals] = useState<IMeal[]>([])
    useEffect(() => {
       apiCalls.getMeat()
            .then(data=>setMeals(data))
    }, [meals]);
    return (
        <div className={'list-container'}>
            {
                meals.map((meal,index) => <div key={index}> {meal.name}</div>)
            }
        </div>
    );
};

export default EntryList;