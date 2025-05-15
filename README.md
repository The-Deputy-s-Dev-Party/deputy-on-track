# Deputy on Track
[![CI](https://github.com/The-Deputy-s-Dev-Party/deputy-on-track/actions/workflows/run_uts.yml/badge.svg)](https://github.com/The-Deputy-s-Dev-Party/deputy-on-track/actions/workflows/run_uts.yml)


## Useful Links
- [Trello](https://trello.com/b/oDkMzePx/deputy-on-track)

## Docker Build and Start

### Prerequisites
- **Docker**: Required for building and running containers.
- **Docker Compose**: Needed for defining and running multi-container Docker applications.
- Create .env file by doing: `cp env-template .env`. Set all the necessary values inside it.

### Build Docker system
Ensure that docker engine is running and execute the following command:
```bash
docker compose build
```

### Run Docker system
Ensure that docker engine is running and execute the following command:
```bash
docker compose up
```

### If you want Run and Build
Ensure that docker engine is running and execute the following command:
```bash
docker compose up --build
```

### Stop Docker system
Ensure that docker engine is running and execute the following command:
```bash
docker stop $(docker ps -q)
```
or in active terminal use ```ctrl+C```

### Mock Server's API
- You can access the server via the following link, provided it's run on localhost: http://localhost:<BACKEND_SERVER_PORT>. Note: BACKEND_SERVER_PORT is taken from .env file.
- You can examine the swagger docs of mock-server's API at `/swagger-ui`

## FastAPI Server's API
- You can access the server via the following link, provided it's run on localhost: http://127.0.0.1:<BACKEND_FASTAPI_PORT>. Note: BACKEND_FASTAPI_PORT is taken from .env file.
- You can examine the swagger docs of fastAPI-server's API at `/docs`

## Frontend build

### Prerequisites
- **NPM**:Required for installing additional packages and running scripts.
- **Node.js**: Needed for configuration and running npm.
- Create .env file by doing: `cp env-template .env`. Set all the necessary values inside it (If you already have one, just set the values)


### How to run a build
To start the project you need to download and install node.js and npm. Use the following link:
- [Node.js & NPM](https://trello.com/b/oDkMzePx/deputy-on-track)

After setting up **Node.js** check versions executing next commands:

### For checking Node.j version
```bash
node -v
```

### For checking NPM version
```bash
npm -v
```

If both commands succeeded then install all necessary packages including vite to run a build
### For installing node_modules
```bash
npm i
```
If you are in root directory, move to **/frontend** directory with following command:
```bash
cd frontend
```

### For running a build
```bash
npm run dev
```
### Access in the browser
You can access the server via the following link, provided it's run on localhost: http://localhost:<VITE_FRONTEND_PORT>. Note: VITE_FRONTEND_PORT is taken from .env file.




## Conventions
Keywords denoting types of your changes (commits, pull-requests, branches):
- `feat` - a new feature: Adding something new that users or other parts of the system can interact with.
Example of commit message: 'feat: add check-in endpoint'
- `fix` - a bug fix: Resolves an issue or unintended behavior.
Example of commit message: 'fix: handle empty user ID in check-out'
- `refactor` - code change that doesn’t add features or fix bugs: improving structure or readability without changing behavior.
Example of commit message: 'refactor: extract session logic to separate module'
- `chore` - non-functional task: updating build scripts, configs, or dependencies. No user-facing impact.
Example of commit message: 'chore: update Makefile with new flags'
- `docs` - documentation only changes. Use the docs prefix when the commit only updates documentation, like README, code comments, API docs etc.
Example of commit message: 'docs: add installation steps to README'
- `test` - adding or modifying tests: Use the test prefix when adding new tests, updating existing ones, or making changes related to testing.
Example: test: add unit tests for check-in endpoint.
- `revert` - reverting the pull request.

Note: prefix the names of your commits, pull-request, branches with the mentioned keywords to specify the type of your changes.
