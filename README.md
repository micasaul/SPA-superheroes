# Superheroes App

SPA para almacenar y visualizar información de personajes de cómics de Marvel y DC.

## Tecnologías

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: MongoDB
- Contenedores: Docker

## Requisitos

- Docker Desktop instalado y corriendo

## Instrucciones

### 1. Levantar el proyecto

```bash
docker-compose up --build
```

- Frontend: http://localhost:80
- Backend: http://localhost:3001

### 2. Cargar los datos iniciales

En otra terminal, una vez que los contenedores estén corriendo:

```bash
docker exec superheroes_backend node seed.js
```

### 3. Apagar el proyecto

```bash
docker-compose down
```
