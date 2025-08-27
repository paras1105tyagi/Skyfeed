## Skyfeed Backend API

Base URL: `http://localhost:3000/api/v1`

### Auth
- Public endpoints: `POST /signup`, `POST /login`, `GET /test`, `GET /tweets`
- Protected endpoints require a JWT in the `Authorization: Bearer <token>` header: `GET /tweets/:id`, `POST /tweets`, `POST /likes/toggle`, `POST /comments`

Get a token by first signing up and then logging in.

---

### Routes and APIs

#### Health
- **GET** `/test`
  - **Auth**: None
  - **Description**: Sanity check; verifies the backend is up.

#### Auth
- **POST** `/signup`
  - **Auth**: None
  - **Body (JSON)**:
    - `email`: string
    - `password`: string
    - `name`: string
  - **Response (201)**:
    - `{ success, message, data: { id, email, name, ... }, err }`

- **POST** `/login`
  - **Auth**: None
  - **Body (JSON)**:
    - `email`: string
    - `password`: string
  - **Response (201)**:
    - `{ success, message, data: <jwtToken>, err }`

#### Tweets
- **GET** `/tweets`
  - **Auth**: None
  - **Query**: none
  - **Response (201)**: `{ success, message, data: [ { id, content, image?, ... } ], err }`

- **GET** `/tweets/:id`
  - **Auth**: Required
  - **Params**: `id` (tweet id)
  - **Response (201)**: `{ success, message, data: { id, content, image?, comments, likes, ... }, err }`

- **POST** `/tweets`
  - **Auth**: Required
  - **Content-Type**: `multipart/form-data`
  - **Fields**:
    - `content`: string
    - `image` (optional): file (S3 upload is supported; controller expects field name `image`)
    - Other fields as required by your service (e.g., user context is taken from auth; the controller passes the body along with optional `image` URL)
  - **Response (201)**: `{ success, message, data: { id, content, image?, ... }, err }`

#### Likes
- **POST** `/likes/toggle`
  - **Auth**: Required
  - **Query**:
    - `modelId`: string (id of the entity to like/unlike)
    - `modelType`: string (e.g., `Tweet` or `Comment`)
  - **Body (JSON)** (optional):
    - `userId`: string (if not provided, ensure your service infers from auth; current controller allows `userId` via body or query)
  - **Response (201)**: `{ success, message, data: { liked: boolean, ... }, err }`
  - **Errors**: 400 for missing params, 404 if target not found

#### Comments
- **POST** `/comments`
  - **Auth**: Required
  - **Query**:
    - `modelId`: string (id of the entity to comment on)
    - `modelType`: string (e.g., `Tweet`)
  - **Body (JSON)**:
    - `content`: string
  - **Response (201)**: `{ success, message, data: { id, content, modelId, modelType, userId, ... }, err }`

---

### Using Postman

For each request, set the method and URL as shown, and configure headers/body accordingly.

- Signup
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/v1/signup`
  - **Headers**: `Content-Type: application/json`
  - **Body (raw JSON)**:
    ```json
    { "email": "user@example.com", "password": "secret", "name": "User" }
    ```

- Login
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/v1/login`
  - **Headers**: `Content-Type: application/json`
  - **Body (raw JSON)**:
    ```json
    { "email": "user@example.com", "password": "secret" }
    ```
  - Copy the `data` field (JWT token) from the response for authenticated requests.

- Get tweets
  - **Method**: GET
  - **URL**: `http://localhost:3000/api/v1/tweets`
  - **Headers**: none required

- Get tweet by id
  - **Method**: GET
  - **URL**: `http://localhost:3000/api/v1/tweets/<id>`
  - **Headers**: `Authorization: Bearer <token>`

- Create tweet (optional image upload)
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/v1/tweets`
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: form-data
    - Key `content` as Text: e.g., `Hello Skyfeed`
    - Key `image` as File (optional): choose a file; key must be `image`

- Toggle like
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/v1/likes/toggle`
  - **Headers**: `Authorization: Bearer <token>`
  - **Query Params**:
    - `modelId`: `<entityId>`
    - `modelType`: `Tweet` (or `Comment`)
  - **Body (optional)**: raw JSON with `userId` if your flow requires explicitly passing it

- Create comment
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/v1/comments`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Query Params**:
    - `modelId`: `<entityId>`
    - `modelType`: `Tweet`
  - **Body (raw JSON)**:
    ```json
    { "content": "Nice post!" }
    ```

---

### Notes
- All responses follow the `{ success, message, data, err }` structure.
- The server runs on port `3000` by default (see `index.js`).

