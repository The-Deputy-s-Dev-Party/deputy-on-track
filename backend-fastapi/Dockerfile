FROM python:3.12-slim

LABEL maintainer="FastAPI_Back"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=2.1.3 \
    POETRY_NO_INTERACTION=1 \
    DEBIAN_FRONTEND=noninteractive \
    PYTHONPATH=/app

RUN pip install --no-cache-dir poetry==${POETRY_VERSION}

WORKDIR /app

COPY . /app/

RUN poetry config virtualenvs.create false && \
    poetry install --no-root

CMD poetry run python app/wait_db.py
