## Getting Started

## Test Results

### npm run test

 ```
 PASS  tests/integration/user.test.js (5.755 s)
 PASS  tests/integration/auth.test.js 
 PASS  tests/integration/object.test.js 
 PASS  tests/unit/models/user.model.test.js
```
```
Test Suites: 4 passed, 4 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        11.705 s
Ran all test suites.
```
### npm run coverage

```
> document-version-control-tool@1.0.0 coverage /home/ubuntu/document-version-control-tool
> jest -i --coverage

 PASS  tests/integration/user.test.js
 PASS  tests/integration/object.test.js
 PASS  tests/integration/auth.test.js
 PASS  tests/unit/models/user.model.test.js
 ```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   88.52 |    74.19 |   88.24 |   88.51 |                   
 controllers           |   91.67 |       50 |      90 |   91.67 |                   
  auth.controller.js   |     100 |      100 |     100 |     100 |                   
  object.controller.js |   77.27 |       25 |   66.67 |   77.27 | 18,24-28          
  user.controller.js   |     100 |      100 |     100 |     100 |                   
 docs                  |     100 |      100 |     100 |     100 |                   
  swaggerDef.js        |     100 |      100 |     100 |     100 |                   
 middlewares           |   90.63 |    66.67 |     100 |   89.83 |                   
  auth.js              |     100 |      100 |     100 |     100 |                   
  error.js             |   72.73 |    35.71 |     100 |   72.73 | 9-11,20-21,33     
  rateLimiter.js       |     100 |      100 |     100 |     100 |                   
  validate.js          |     100 |      100 |     100 |     100 |                   
 models                |     100 |      100 |     100 |     100 |                   
  index.js             |     100 |      100 |     100 |     100 |                   
  object.model.js      |     100 |      100 |     100 |     100 |                   
  token.model.js       |     100 |      100 |     100 |     100 |                   
  user.model.js        |     100 |      100 |     100 |     100 |                   
 models/plugins        |   94.12 |     87.5 |     100 |   94.12 |                   
  index.js             |     100 |      100 |     100 |     100 |                   
  paginate.plugin.js   |     100 |      100 |     100 |     100 |                   
  toJSON.plugin.js     |   86.67 |       75 |     100 |   86.67 | 11,28             
 routes/v1             |     100 |      100 |     100 |     100 |                   
  auth.route.js        |     100 |      100 |     100 |     100 |                   
  docs.route.js        |     100 |      100 |     100 |     100 |                   
  index.js             |     100 |      100 |     100 |     100 |                   
  object.route.js      |     100 |      100 |     100 |     100 |                   
  user.route.js        |     100 |      100 |     100 |     100 |                   
 services              |   76.44 |    62.79 |   69.57 |   76.74 |                   
  auth.service.js      |   41.18 |       40 |      25 |   41.18 | 27-31,40-49,60-69 
  email.service.js     |   53.85 |      100 |       0 |   53.85 | 22-23,33-39       
  index.js             |     100 |      100 |     100 |     100 |                   
  object.service.js    |   94.64 |    64.71 |     100 |    96.3 | 83,86             
  token.service.js     |   65.71 |    33.33 |      60 |   65.71 | 52-57,91-98       
  user.service.js      |     100 |      100 |     100 |     100 |                   
 utils                 |   95.45 |     87.5 |     100 |      95 |                   
  ApiError.js          |   85.71 |       75 |     100 |   85.71 | 7                 
  catchAsync.js        |     100 |      100 |     100 |     100 |                   
  helpers.js           |     100 |      100 |     100 |     100 |                   
  pick.js              |     100 |      100 |     100 |     100 |                   
 validations           |     100 |      100 |     100 |     100 |                   
  auth.validation.js   |     100 |      100 |     100 |     100 |                   
  custom.validation.js |     100 |      100 |     100 |     100 |                   
  object.validation.js |     100 |      100 |     100 |     100 |                   
  user.validation.js   |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------

```
Test Suites: 4 passed, 4 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        9.868 s, estimated 12 s
Ran all test suites.
```

## Database Structure

![Database Structure](https://lh3.googleusercontent.com/H1NuqKXjwjC513gbEUBs67APTVeGRRD3t_1vADiXDPOxG7c6UkweNfpKQB4-oVHQ9L4a5DSDqOMIQiGVQW83Jtu6Pa25JzawxgbjJW5XlyJx8DthoG6vwyXvdyg5u8-vu0LtUFFZW2kgKvibKUwzBLahpRQyKnNM0H8Q6RybNHe_rVesj-mQgDJiVkJm7y_JhA1GARJSsyp7pAzpR2dogAawfLnFq_BU2FEF0R9ffV4UcqBT6NAmYzIyMBstzRUMI3yjqvcKZC4hu1jLNurrLO_5Imk0hGDTZXiyqCC_d-B_3LuNuqMxHC3YA62LTCK8GU6C3jludCiah5HpfZzynezN1x7JQG1zWp5ozVbSl5iy7rb-KCKcj05xJ726j8tGQXBPs_YBWPqtSHmMgBbF7QQvqQ1iM5cZLeniuxctJVKQ1sWevrP6lMr9-PITyVJemK-M9cKdn69_IRZLb-T4DCv9fx8xloQpOalbKtQ8SQlBhclD-WdRGs8_n0qTP8iMs9pPAvsRyFCS8-qmtoWBjuyJvgPThU51wYEYouDLulLp6zHe6Ys6pOKT8nlAMuv8XoNQ7LtnzEU0cGkC62RIe6EEK7kcc81LJpbfrhNhx7TRRXO7uFcAQlMiotd1e3qOMlDgMp9dGWALDnDiqXhOaWCDu79TjjK54XhF4Til9tuwAEtPT30REIQ2J_4ulw=w1008-h89-no?authuser=0)

## Drawbacks in the tool

* Above DB architecture will lead to more space usage in case of long strings. 
* This can be handled by saving diff of the document in another collection. 
* This will lead to conflicts. 
* We can implement push mechanism to let user know that value has changed and ask him to resolve conflicts. 
* Eventually we will end up builing a proper version control tool.


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


## Authentication

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Adding token in swager**

In swagger UI click on "Authorize" button on top right side of swagger page and enter the access token for Authentication. 

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

## Authorization

An authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.