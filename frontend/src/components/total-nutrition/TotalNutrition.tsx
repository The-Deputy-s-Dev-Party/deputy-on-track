import type {IMeal} from "../../models/meal/IMeal.ts";
import {type FC, useMemo} from "react";
import type {ITotals} from "../../models/meal/ITotals.ts";

type Props ={
    historyMeals:IMeal[];
}

export const TotalNutrition:FC<Props> = ({historyMeals}) => {
    const totals:ITotals = useMemo(()=>{
        return historyMeals.reduce(
            (acc:ITotals, meal):ITotals => ({
                calories: acc.calories + Number(meal.calories),
                fats: acc.fats + Number(meal.fats),
                proteins: acc.proteins + Number(meal.proteins),
                carbohydrates: acc.carbohydrates + Number(meal.carbohydrates),
            }),
            { calories: 0, fats: 0, proteins: 0, carbohydrates: 0 }
        );
    },[historyMeals])

    return (
        <div className={'container right'}>
            <div>
                <h3>Total nutrition</h3>
                <h4>Calories - {totals.calories}</h4>
                <h4>Fats - {totals.fats}</h4>
                <h4>Proteins - {totals.proteins}</h4>
                <h4>Carbohydrates - {totals.carbohydrates}</h4>
            </div>
        </div>
    );
};
