# Use a imagem Node.js LTS como base
FROM node:lts

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o arquivo .env para dentro do contêiner
COPY .env ./

# Execute os comandos do Prisma
RUN npx prisma generate
# Se você tiver migrações do Prisma, você pode aplicá-las também
RUN npx prisma migrate deploy

# Copie o restante do código fonte da aplicação
COPY . .

# Exponha a porta em que a aplicação está sendo executada
EXPOSE 3000

# Comando a ser executado quando o contêiner for iniciado
CMD [ "npm", "run", "start:dev" ]