from datetime import date
from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import AsyncAttrs

class Base(AsyncAttrs, DeclarativeBase):
    pass


class Food(Base):
    __tablename__ = 'food'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    weight = Column(Float)
    calories = Column(Float)
    proteins = Column(Float)
    fats = Column(Float)
    carbohydrates = Column(Float)
    created_at = Column(Date, default=lambda: date.today(), index=True)
