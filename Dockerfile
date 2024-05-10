# Primera etapa: construir la aplicación React
FROM node:18-alpine as build

WORKDIR /app

# Copiamos el archivo package.json y el archivo package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todos los archivos del frontend al directorio de trabajo
COPY . .

# Construimos la aplicación React
RUN npm run build

# Segunda etapa: configurar Apache y servir la aplicación React construida
#FROM httpd:alpine

# Copiamos los archivos de construcción del frontend React desde la fase de compilación anterior
#COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# Exponemos el puerto 80 para que Apache pueda servir la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación backend
CMD ["npm", "start"]