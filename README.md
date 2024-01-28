# Home Assignment 

Create a simple API to manage a user collection.

### Application Structure

- api/routes/account
    - auth.ts
        - auth.controller.ts
        - auth.model.ts

    - user.ts
        - user.controller.ts
        - user.model.ts

- database
    - collection/account.ts
    - populateDB.ts

### Auth route

Create a user authenticated to access the `users` API.

Authentication is done using JWT (JSON Web Token).


### Users route

API to manage a user collection.

You must be authenticated to access this API.

### Application Stack
- Express
- Mongoose
- Typescript


## Database

The database is MongoDB. On the first load of the application it will fetch the first 10 pages from the [reqres.in](https://reqres.in).

## WebUI

Simple HTML page to interact with the API available at `http://localhost:3000/`

## Running the project

#### Directly
Make sure you have MongoDB installed and running on your machine.
```bash
npm install
npm run build
npm run start
```

#### Docker
```bash
docker-compose up
```
