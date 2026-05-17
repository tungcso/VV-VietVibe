# Swagger Test Flow

## Token Rules

- Use a normal user access token for logout and revoke tests.
- Use an admin access token for CRUD tests.
- For protected routes, paste the raw `access_token` into Swagger Authorize as a Bearer token.

## Public Endpoints

These do not require `Authorize` in Swagger:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/refresh`
- `GET /vocabulary`
- `GET /vocabulary/learning-unit/:learningUnitId`
- `GET /listening`
- `GET /listening/:id`
- `GET /listening/learning-unit/:learningUnitId`

## User Token Endpoints

Use a normal user token here:

- `POST /auth/logout`
- `POST /auth/revoke`
- `POST /auth/revoke-all`

## Admin-Only Endpoints

Use an admin token here:

### Vocabulary

- `POST /vocabulary/admin/create`
- `GET /vocabulary/admin/:id`
- `PUT /vocabulary/admin/:id`
- `DELETE /vocabulary/admin/:id`
- `GET /vocabulary/admin/list/all`

### Listening

- `POST /listening`
- `PUT /listening/:id`
- `DELETE /listening/:id`

## Suggested Test Order

1. Login with a normal user.
2. Paste the user access token into Swagger Authorize.
3. Test `POST /auth/logout` or `POST /auth/revoke`.
4. Login with an admin user.
5. Paste the admin access token into Swagger Authorize.
6. Test vocabulary admin CRUD.
7. Test listening admin CRUD.

## Common Mistakes

- Using a refresh token in Authorize instead of an access token.
- Using a normal user token for admin routes.
- Sending an invalid `learning_unit_id` to create vocabulary or listening data.
- Forgetting that `learning_unit_id` must already exist in MongoDB.
