# authForge

Inspired by `Google's Zanzibar system`, the idea is to develop a third-party library that simplifies backend management of user information, moving away from the repetitive task of creating user-related schemas and integrating `JWT (JSON Web Tokens)` and authorization logic with each implementation. The library aims to provide easy-to-use methods for handling user JWT functionalities and permission checks, enabling developers to efficiently manage user authentication and authorization without the need to repeatedly code these features from scratch. This approach seeks to streamline backend development processes, focusing on reusability and ease of integration in various projects.

# Developer Comments!

Thank you for using my immature library. I hope you'll visit my [GitHub](https://github.com/velo1203/AuthForge) and share your feedback and information with me, I'll do my best to incorporate it. Thank you.

# Installation

```bash
npm install authforge
```

This is the process of installing auth forge.

# Documentation

The current document is briefly here. If the library receives a lot of support and support, we plan to develop a dedicated documentation site and further expand the library.

# Initialization

```javascript
const AuthForge = require("authforge");
```

First, import the library. This is the process you must do first.

```javascript
const authForge = new AuthForge("DB URL");
```

authforge is based on sqlite3 as an early version. After creating an AuthForge object, you will receive the URL of sqlite3 as an argument.

```javascript
authforge.setSecret("secretKey");
```

The above code is the part that sets the JWT authentication secret key for authforge.

```javascript
authforge.user.expiresIn("1d");
```

The above code indicates the age of JWT's token.

-   `s` (seconds)
-   `m `(minutes)
-   `h` (hours)
-   `d `(days)
-   `w` (weeks)

# user

```javascript
authforge.user.register("email", "password", "username");
```

The code above is the user's signup function. It checks if the user exists, signs up, and returns the user's information and token, which is also stored in the database.

```javascript
authforge.user.login("email", "password");
```

The code above is the user's login function. It checks if the user exists, logs in, and returns the user's information and token, which is also stored in the database.

# Authorization

```javascript
authforge.auth.authenticate(token);
```

The token lets you know if a user is present or not. It can be used as a function in middleware. If the user exists, return the user's information.
