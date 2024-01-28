FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the app
RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 443

ENV JWT_SECRET = ''
ENV MONGO_URI = ''
ENV ORIGINS = ''

# Run the application
CMD ["npm", "start"]
