# Xideral-api-calls
CRUD de datos de empleado y usuario
Este proyecto fué creado con el siguiente comando 
$ npx create-react-app xideral-prueba-tecnica

## Dependencias
Se instalaron dependencias
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/icons-material
$ npm install sass
$ npm install json-server

## Uso de Sass
Se agrega el script en package.json.
En “scripts”:{}
    "build:css": "sass ./src/input.scss ./src/output.css"
Su compilación es con el siguiente comando
$ npm run build:css
Todos los archivos se importan a input.scss.

## Uso de Json Server
Se usa Json Server para simular una API
Se levanta el servidor con el siguiente comando
$ json-server --watch db.json --port 3001

### Levantar el proyecto
Usa el comando `npm start`
Levantará en el puerto 3000
http://localhost:3000/

Para más información, visite la documentación compartida por correo electrónico.
