## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/3bu1/document-version-control-tool.git
cd document-version-control-tool
```

Install the dependencies:

```bash
yarn install
```

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

**Object routes**:\
`POST /v1/objects` - create a object\
`GET /v1/objects/:key?timestamp=1000` - get object\

## Drawbacks in the tool

The DB architecture we choosed will lead to more space usage. This can be handled by saving diff of the document in another collection. 
This will lead to conflicts. We can implement push mechanism to let user know that value has changed and ask him to resolve conflicts. Eventually we will end up builing a proper version control tool. Thanks.