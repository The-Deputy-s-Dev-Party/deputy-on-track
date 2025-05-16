from fastapi import FastAPI
from app.api import route_food

app = FastAPI(root_path='/api')

@app.get('/')
async def root():
    return {'message': 'Hello'}

app.include_router(route_food.router)
