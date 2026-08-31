<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Product Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` copiado de `.env.template`
4. Ejecutar las migraciones de prisma `npx prisma migrate dev`
5. Ejecutar la aplicación
```bash
npm run start:dev
```

## Primsa

```bash
npm run prisma:generate
npx prisma migrate dev --name init_database
npm run prisma:push
```
