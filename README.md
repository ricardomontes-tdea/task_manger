# Task Manager API

Dockerized Node.js/Express REST API to manage tasks, backed by MongoDB with a Redis-backed email job queue (BullMQ).

## Tech stack

- Node.js / Express
- MongoDB + Mongoose
- Redis + BullMQ (background jobs)
- Docker / Docker Compose
- Jenkins (CI/CD)
- Jest + node-mocks-http (testing)

## Prerequisites

- Docker and Docker Compose

## Setup

```bash
docker compose up --build -d
```

This starts three containers:

| Service | Container name | Port (host:container) | Purpose |
|---|---|---|---|
| `task_manager_api` | - | `8000:8000` | The Express API |
| `task_manager_mongo_db` | `mongodb_task_manager` | `27017:27017` | MongoDB database |
| `task_manager_redis` | `redis_task_manager` | `6379:6379` | Redis, used by the BullMQ email queue |

## Environment variables

The API is configured via environment variables (already set in `docker-compose.yml` for local/dockerized use):

| Variable | Description | Example |
|---|---|---|
| `APP_PORT` | Port the API listens on | `8000` |
| `MONGODB_URI` | MongoDB connection string (without DB name) | `mongodb://task_manager_mongo_db:27017` |
| `DB_NAME` | MongoDB database name | `task_manager_db` |

## API Reference

Base path: `/api/v1`

All responses are JSON with an `ok` boolean, plus `data`/`tasks`/`msg` on success or `error.message` on failure.

### Create a task

`POST /api/v1/tasks`

Body:

```json
{
  "name": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

- `name` is required (validated, must not be empty).

Responses:
- `200` — task created
- `400` — validation error, or a task with that `name` already exists
- `500` — server error

### Get all tasks

`GET /api/v1/tasks`

Responses:
- `200` — returns `{ ok: true, tasks: [...] }`
- `500` — server error

### Delete a task

`DELETE /api/v1/tasks/:id`

Responses:
- `200` — task deleted
- `404` — task not found
- `500` — server error

## Seed data

Load 20 sample tasks into the database (requires the containers to be running so `MONGODB_URI`/`DB_NAME` are reachable):

```bash
npm run seed
```

This clears the `tasks` collection and inserts 20 sample records. See `database/seed.js`.

## Testing

```bash
npm test        # run Jest suite with coverage
npm run jest    # run Jest in watch mode with coverage
```

Test suites live under `test/` and cover controllers, middlewares, and routes.

## CI/CD

The `Jenkinsfile` pipeline runs on each build:

1. Install dependencies (`npm install`)
2. Run Jest tests (`npm test`)
3. Tear down containers (`docker compose down -v`)
4. Build and start containers (`docker compose up --build -d`)

## Project structure

```
controllers/   Route handlers (business logic)
routes/        Express route definitions
models/        Mongoose schemas
middlewares/   Request validation middleware
database/      MongoDB connection setup
queues/        BullMQ email job queue
test/          Jest test suites
```

## Author

Ricardo Montes — ISC License
