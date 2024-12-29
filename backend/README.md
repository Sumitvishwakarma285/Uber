# API Documentation

## Endpoints

### 1. `/users/register`

#### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JWT token along with the user data.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:
- **`fullname`**: An object containing:
  - **`firstname`**: A string with a minimum length of 3 characters (required).
  - **`lastname`**: A string with a minimum length of 3 characters (optional).
- **`email`**: A string representing a valid email address (required).
- **`password`**: A string with a minimum length of 5 characters (required).

##### Example
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### 2. `/users/login`

#### Description
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JWT token along with the user data if the credentials are valid.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:
- **`email`**: A string representing a valid email address (required).
- **`password`**: A string with a minimum length of 5 characters (required).

##### Example
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

#### Response

##### Success
If the login is successful, the response will be a JSON object containing:
- **`token`**: A JWT token.
- **`user`**: The user data.

###### Example
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

##### Failure
If the login fails, the response will be a JSON object containing an error message.

###### Example
```json
{
  "errors": [
    {
      "msg": "Invalid Email or Password"
    }
  ]
}
```


### 3. `/users/profile`

#### Description
This endpoint fetches the profile of the currently authenticated user.

#### Method
`GET`

#### Headers
The request must include the following header:
- **`Authorization`**: A string containing the Bearer token (required).

##### Example
```http
GET /users/profile HTTP/1.1
Authorization: Bearer <token>
```

---

#### Response

##### Success
If the request is successful, the response will be a JSON object containing the user's profile.

###### Example
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

##### Failure
If the request fails, the response will be a JSON object containing an error message.

###### Example
```json
{
  "errors": [
    {
      "msg": "Authentication required"
    }
  ]
}
```

---

### 4. `/users/logout`

#### Description
This endpoint logs out the currently authenticated user by clearing the authentication token and blacklisting it.

#### Method
`GET`

#### Headers
The request must include the following header:
- **`Authorization`**: A string containing the Bearer token (required).

##### Example
```http
GET /users/logout HTTP/1.1
Authorization: Bearer <token>
```

---

#### Response

##### Success
If the logout is successful, the response will be a JSON object confirming the action.

###### Example
```json
{
  "message": "Logged Out Successfully"
}
```

##### Failure
If the logout fails, the response will be a JSON object containing an error message.

###### Example
```json
{
  "errors": [
    {
      "msg": "Invalid Token"
    }
  ]
}
```


