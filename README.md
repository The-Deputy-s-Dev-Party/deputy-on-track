# Deputy on Track
[![CI](https://github.com/The-Deputy-s-Dev-Party/deputy-on-track/actions/workflows/run_uts.yml/badge.svg)](https://github.com/The-Deputy-s-Dev-Party/deputy-on-track/actions/workflows/run_uts.yml)


## Useful Links
- [Trello](https://trello.com/b/oDkMzePx/deputy-on-track)

## Mock Server

### Prerequisites
- **Docker**: Required for building and running containers.
- **Docker Compose**: Needed for defining and running multi-container Docker applications.
- **Make**: Used for automating build tasks.
- Create .env file by doing: `cp env-template .env`. Set all the necessary values inside it.

### Build Mock Server
Ensure that docker engine is running and execute the following command:
```bash
make build-server
```

### Run Mock Server
Ensure that docker engine is running and execute the following command:
```bash
make run-server
```

### Stop Mock Server
Ensure that docker engine is running and execute the following command:
```bash
make stop-server
```

### Mock Server's API
- You can access the server via the following link, provided it's run on localhost: http://localhost:<BACKEND_SERVER_PORT>. Note: BACKEND_SERVER_PORT is taken from .env file.
- You can examine the swagger docs of mock-server's API at `/swagger-ui`

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
