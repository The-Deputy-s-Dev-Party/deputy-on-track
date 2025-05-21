from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_async_session
from app.models.food import Food as FoodModel
from app.schemas.food_schema import CreateFood, FoodOut

router = APIRouter(prefix='/food', tags=['Food'])

@router.get('/', response_model=list[FoodOut])
async def get_all(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(FoodModel))
    food = result.scalars().all()
    return food

@router.post('/', response_model=FoodOut)
async def create_food(food: CreateFood, session: AsyncSession = Depends(get_async_session)):
    db_food = FoodModel(name=food.name, weight=food.weight, calories=food.calories, proteins=food.proteins, fats=food.fats, carbohydrates=food.carbohydrates)
    session.add(db_food)
    await session.commit()
    await session.refresh(db_food)
    return db_food


@router.get('/last_week', response_model=list[FoodOut])
async def food_of_last_seven_days(session: AsyncSession = Depends(get_async_session)):
    today = date.today()
    seven_days_ago = today - timedelta(days=7)

    result = await session.execute(
        select(FoodModel).filter(
            FoodModel.created_at>=seven_days_ago,
            FoodModel.created_at<today
        )
    )
    food = result.scalars().all()
    return food


@router.get('/date', response_model=list[FoodOut])
async def food_filter_by_date(session: AsyncSession = Depends(get_async_session)):
    date_now = date.today()
    result = await session.execute(select(FoodModel).filter(FoodModel.created_at == date_now))
    food = result.scalars().all()
    return food

@router.get('/{food_id}', response_model=FoodOut)
async def get_food_by_id(food_id: int, session: AsyncSession = Depends(get_async_session)):
    food = await session.scalar(select(FoodModel).filter(FoodModel.id == food_id))
    if food is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Food not found')
    print('TESSST', type(food.created_at))
    return food


@router.put('/{food_id}', response_model=FoodOut)
async def update_food(food_id:int, food: CreateFood, session: AsyncSession = Depends(get_async_session)):
    db_food = await session.scalar(select(FoodModel).filter(FoodModel.id == food_id))
    if db_food is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Food not found')

    db_food.name = food.name
    db_food.weight = food.weight
    db_food.calories = food.calories
    db_food.proteins = food.proteins
    db_food.fats = food.fats
    db_food.carbohydrates = food.carbohydrates

    await session.commit()
    return db_food


@router.delete('/{food_id}')
async def delete_food(food_id: int, session: AsyncSession = Depends(get_async_session)):
    food = await session.scalar(select(FoodModel).filter(FoodModel.id == food_id))
    if food is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Food not found')
    await session.delete(food)
    await session.commit()
    return {'message': 'Food delete'}
