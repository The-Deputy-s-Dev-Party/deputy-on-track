import type {IMeal} from "../../models/meal/IMeal.ts";
import {EntryListItem} from "../entry-list-item/EntryListItem.tsx";

type Props = {
    meals: IMeal[]
}

export const EntryList = ({meals}: Props) => {
    return (
        <div className={"list-container"}>
            {meals.map((meal, index) => (
                <EntryListItem key={index} item={meal}/>
            ))}
        </div>

    )
}
