import {type Dispatch, type FC, memo, type SetStateAction} from "react";
import type {IMeal} from "../../models/meal/IMeal.ts";
import {EntryListItem} from "../entry-list-item/EntryListItem.tsx";

interface Props {
    meals: IMeal[]
    setMeals: Dispatch<SetStateAction<IMeal[]>>
    setHistoryMeals: Dispatch<SetStateAction<IMeal[]>>
}

export const EntryList: FC<Props> = memo(({meals, setMeals, setHistoryMeals}: Props) => {
    return (
        <div className={"list-container"}>
            {meals.map((meal, index) => (
                <EntryListItem key={index} item={meal} setMeals={setMeals} setHistoryMeals={setHistoryMeals}/>
            ))}
        </div>
    );
});
