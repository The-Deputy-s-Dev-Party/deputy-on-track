from datetime import date
from pydantic import BaseModel, ConfigDict

class FoodBase(BaseModel):
    name: str
    weight: float
    calories: float
    proteins: float
    fats: float
    carbohydrates: float


class CreateFood(FoodBase):
    pass


class FoodOut(FoodBase):
    id : int
    created_at: date

    model_config = ConfigDict(from_attributes=True)
