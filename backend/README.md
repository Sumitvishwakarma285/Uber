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

---

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

---

### 5. `/captains/register`

#### Description
This endpoint is used to register a new captain. It validates the input data, creates a new captain in the database, and returns the created captain data.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- **`fullname`**: An object containing:
  - **`firstname`**: A string with a minimum length of 3 characters (required).
  - **`lastname`**: A string (optional).
- **`email`**: A string representing a valid email address (required).
- **`password`**: A string with a minimum length of 6 characters (required).
- **`vehicle`**: An object containing:
  - **`color`**: A string with a minimum length of 3 characters (required).
  - **`plate`**: A string with a minimum length of 3 characters (required).
  - **`capacity`**: An integer greater than or equal to 1 (required).
  - **`vehicleType`**: A string, one of `car`, `bike`, or `auto` (required).

##### Example
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "vehicle": {
        "color": "Blue",
        "plate": "XYZ1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

---

#### Response

##### Success (201 Created)
If the registration is successful, the response will be a JSON object containing the registered captain's details.

###### Example
```json
{
    "message": "Captain registered successfully",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "XYZ1234",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

##### Failure (400 Bad Request)
If the validation fails, the response will be a JSON object containing an array of error messages.

###### Example
```json
{
    "errors": [
        "Email is required",
        "Password must be at least 6 characters"
    ]
}
```
### 6. `/captains/login`

#### Description
This endpoint is used to log in an existing captain. It validates the input data, checks the captain's credentials, and returns a JWT token along with the captain data if the credentials are valid.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:
- **`email`**: A string representing a valid email address (required).
- **`password`**: A string with a minimum length of 6 characters (required).

##### Example
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

#### Response

##### Success
If the login is successful, the response will be a JSON object containing:
- **`token`**: A JWT token.
- **`captain`**: The captain data.

###### Example
```json
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
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

---

### 7. `/captains/profile`

#### Description
This endpoint fetches the profile of the currently authenticated captain.

#### Method
`GET`

#### Headers
The request must include the following header:
- **`Authorization`**: A string containing the Bearer token (required).

##### Example
```http
GET /captains/profile HTTP/1.1
Authorization: Bearer <token>
```

---

#### Response

##### Success
If the request is successful, the response will be a JSON object containing the captain's profile.

###### Example
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
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

### 8. `/captains/logout`

#### Description
This endpoint logs out the currently authenticated captain by clearing the authentication token and blacklisting it.

#### Method
`GET`

#### Headers
The request must include the following header:
- **`Authorization`**: A string containing the Bearer token (required).

##### Example
```http
GET /captains/logout HTTP/1.1
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