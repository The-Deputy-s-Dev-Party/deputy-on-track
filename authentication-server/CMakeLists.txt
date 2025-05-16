cmake_minimum_required(VERSION 3.10)  # Используй минимум 3.10 или выше

project(myprogram C)  # Проект на чистом C

set(CMAKE_C_STANDARD 11)  # Укажи стандарт C
set(CMAKE_C_STANDARD_REQUIRED ON)

# Укажи исходный файл (относительно корня проекта)
add_executable(authentication_server src/main.c)
