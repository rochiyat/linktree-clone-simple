# API Documentation

Complete API reference for Linktree Clone Simple.

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## Authentication

Most endpoints require authentication using NextAuth.js session cookies.

### Headers

```
Content-Type: application/json
Cookie: next-auth.session-token=<token>
```

---

## Endpoints

### Authentication

#### Register User

Create a new user account.

```http
POST /api/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response (201 Created):**

```json
{
  "user": {
    "id": "clx1234567890",
    "email": "john@example.com",
    "name": "John Doe",
    "username": "johndoe"
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing fields
{
  "error": "Missing required fields"
}

// 400 Bad Request - User exists
{
  "error": "User already exists"
}
```

---

#### Login

Login handled by NextAuth.js

```http
POST /api/auth/signin
```

Use NextAuth's `signIn()` function from client:

```typescript
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  email: 'john@example.com',
  password: 'securepassword123',
  redirect: false,
});
```

---

#### Logout

```http
POST /api/auth/signout
```

Use NextAuth's `signOut()` function:

```typescript
import { signOut } from 'next-auth/react';

await signOut();
```

---

### Links Management

All link endpoints require authentication.

#### Get All Links

Get all links for the authenticated user.

```http
GET /api/links
```

**Response (200 OK):**

```json
[
  {
    "id": "clx1234567890",
    "title": "My Website",
    "url": "https://example.com",
    "description": "Check out my website",
    "icon": "Globe",
    "color": "purple",
    "order": 0,
    "isActive": true,
    "userId": "clx0987654321",
    "createdAt": "2024-11-20T10:00:00.000Z",
    "updatedAt": "2024-11-20T10:00:00.000Z"
  }
]
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

#### Create Link

Create a new link.

```http
POST /api/links
```

**Request Body:**

```json
{
  "title": "My Website",
  "url": "https://example.com",
  "description": "Check out my website",
  "icon": "Globe",
  "color": "purple"
}
```

**Required Fields:**
- `title` (string)
- `url` (string, valid URL)

**Optional Fields:**
- `description` (string)
- `icon` (string, Lucide icon name)
- `color` (string: purple, blue, green, red, orange, pink)

**Response (201 Created):**

```json
{
  "id": "clx1234567890",
  "title": "My Website",
  "url": "https://example.com",
  "description": "Check out my website",
  "icon": "Globe",
  "color": "purple",
  "order": 0,
  "isActive": true,
  "userId": "clx0987654321",
  "createdAt": "2024-11-20T10:00:00.000Z",
  "updatedAt": "2024-11-20T10:00:00.000Z"
}
```

**Error Responses:**

```json
// 400 Bad Request
{
  "error": "Title and URL are required"
}

// 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

#### Update Link

Update an existing link.

```http
PATCH /api/links/[id]
```

**URL Parameters:**
- `id` (string) - Link ID

**Request Body:**

```json
{
  "title": "Updated Title",
  "url": "https://newurl.com",
  "description": "Updated description",
  "icon": "Star",
  "color": "blue",
  "isActive": false,
  "order": 1
}
```

All fields are optional. Only include fields you want to update.

**Response (200 OK):**

```json
{
  "id": "clx1234567890",
  "title": "Updated Title",
  "url": "https://newurl.com",
  "description": "Updated description",
  "icon": "Star",
  "color": "blue",
  "order": 1,
  "isActive": false,
  "userId": "clx0987654321",
  "createdAt": "2024-11-20T10:00:00.000Z",
  "updatedAt": "2024-11-20T11:00:00.000Z"
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "Unauthorized"
}

// 404 Not Found
{
  "error": "Not found"
}
```

---

#### Delete Link

Delete a link.

```http
DELETE /api/links/[id]
```

**URL Parameters:**
- `id` (string) - Link ID

**Response (200 OK):**

```json
{
  "message": "Link deleted"
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "Unauthorized"
}

// 404 Not Found
{
  "error": "Not found"
}
```

---

### Profile Management

#### Get Profile

Get authenticated user's profile.

```http
GET /api/profile
```

**Response (200 OK):**

```json
{
  "id": "clx0987654321",
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "bio": "Full Stack Developer",
  "image": "https://example.com/avatar.jpg"
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

#### Update Profile

Update user profile.

```http
PATCH /api/profile
```

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "bio": "Senior Full Stack Developer",
  "image": "https://example.com/new-avatar.jpg"
}
```

All fields are optional.

**Response (200 OK):**

```json
{
  "id": "clx0987654321",
  "name": "John Doe Updated",
  "email": "john@example.com",
  "username": "johndoe",
  "bio": "Senior Full Stack Developer",
  "image": "https://example.com/new-avatar.jpg"
}
```

**Error Responses:**

```json
// 401 Unauthorized
{
  "error": "Unauthorized"
}
```

---

### Public Endpoints

#### Get Public User Data

Get public user profile and active links.

```http
GET /api/user/[username]
```

**URL Parameters:**
- `username` (string) - User's username

**Response (200 OK):**

```json
{
  "id": "clx0987654321",
  "name": "John Doe",
  "username": "johndoe",
  "bio": "Full Stack Developer",
  "image": "https://example.com/avatar.jpg",
  "links": [
    {
      "id": "clx1234567890",
      "title": "My Website",
      "url": "https://example.com",
      "description": "Check out my website",
      "icon": "Globe",
      "color": "purple",
      "order": 0
    }
  ]
}
```

**Error Responses:**

```json
// 404 Not Found
{
  "error": "User not found"
}
```

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "error": "Error message description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently not implemented. Recommended for production:

- Registration: 5 requests per hour per IP
- Login: 10 requests per 15 minutes per IP
- API endpoints: 100 requests per 15 minutes per user

---

## Examples

### JavaScript/TypeScript

#### Register User

```typescript
const response = await fetch('/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'securepassword123',
  }),
});

const data = await response.json();
```

#### Create Link

```typescript
const response = await fetch('/api/links', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Website',
    url: 'https://example.com',
    description: 'Check it out',
    color: 'purple',
  }),
});

const link = await response.json();
```

#### Update Link

```typescript
const response = await fetch(`/api/links/${linkId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    isActive: false,
  }),
});

const updatedLink = await response.json();
```

#### Delete Link

```typescript
const response = await fetch(`/api/links/${linkId}`, {
  method: 'DELETE',
});

const result = await response.json();
```

---

### cURL Examples

#### Register

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

#### Create Link

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=<token>" \
  -d '{
    "title": "My Website",
    "url": "https://example.com",
    "color": "purple"
  }'
```

#### Get Public User

```bash
curl http://localhost:3000/api/user/johndoe
```

---

## Webhooks

Not currently implemented. Future feature for:
- Link click tracking
- Profile updates
- New link creation

---

## Versioning

Current API version: v1 (implicit)

Future versions will be prefixed: `/api/v2/...`

---

## Support

For API questions:
- Check this documentation
- Open an issue on GitHub
- Contact maintainers

---

**Last Updated**: November 20, 2024
