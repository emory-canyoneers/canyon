# Canyon Backend API

All fields are strings unless otherwise specified.

## Auth/User Endpoints

**All Other Endpoints Are Authenticated Unless Otherwise Specified!**

- Log in:

  - **GET** /auth
  - body: `{"email", "password"}`
  - returns: `{"token", "expiry"}`

- Sign up:

  - **POST** /users
  - body: `{"name", "email", "password"}`
  - returns: `{"token", "expiry"}`

- **The return token must be stored securely and passed with each authenticated request as an authentication header!**
- To include authentication, create the `Authorization`, `Bearer <token>` key, value pair in the header (remove the brackets around token but include `Bearer `)

## User Endpoints

- Delete user:

  - **DELETE** /users
  - body: `{"userId"}`
  - returns: Success code of operation

## Group Endpoints

- Create group:

  - **POST** /groups
  - body: `{"name"}`
  - returns: Created group `{"id", "name", "issueCount" integer, "owner", "members" [string], "issues" [issue]}`

- Fetch groups user is in

  - **GET** /groups`?limit=n, default 10 if not included`
  - returns: First n groups `[group]`

- Join a group

  - **PUT** /groups/`groupId`
  - returns: Joined group `{"id", "name", "issueCount" integer, "owner", "members" [string], "issues" [issue]}`

- Delete a group

  - **DELETE** /groups/`groupId`
  - returns: Success code of operation

## Issue Endpoints

- Create a new issue:

  - **POST** /issues
  - body: `{"groupId", "question"}`
  - returns: Created issue `{"id", "issueNumber" integer, "date" string yyyy-mm-dd, "question", "group", "response" [response]}`

- Get issues from specified group:

  - **GET** /issues/`groupId` `?limit=n, default 10 if not included`
  - returns: List of issues `[issue]`

## Response Endpoints

- Respond to current issue:

  - **POST** /responses
  - body: `{"groupId", "response"}`
  - returns: Created response `{"id", "response", "user", "group", "issue"}`

- Get responses in specified issue:

  - **GET** /responses/`issueId`
  - returns: List of responses `[response]`

- Edit a response:

  - **PUT** /responses
  - body: `{"responseId", "response"}`
  - returns: Edited response `{"id", "response", "user", "group", "issue"}`
