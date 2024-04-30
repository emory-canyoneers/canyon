# Canyon Backend API

The backend service that provides our frontend with an authentication-enforced view of models such as groups, questions, answers, and users.

## Documentation

For a general overview, see the [broad overview](#broad-overview) section; if you'd like to get into the weeds, see the [technical details](#technical-details) section.

### Architecture Diagram

![backend architecture diagram](../doc/backend-architecture-diagram.png)

### Broad Overview

Our backend is a simple RESTful API serving various requests necessary to run the Canyon app. Specific requests that can be made are listed in the [endpoints section](#endpoints), but they mainly comprise of authentication endpoints allowing users to sign up or log in, and view endpoints, which provide access (create, read, update, destroy) to a user's groups, questions, answers.

No installation needs to be done, as this is deployed online and accessible at our [endpoints](#endpoints). If you would like to run the backend yourself, please refer to the [testing section](#testing) to learn how to run the project locally.

### Technical Details

Our backend is split intuitively into the following structure:

- `java/.../canyon/`
  - `config/`
    - Provides configurations for object serialization, web security requirements, MongoDB, and access to environment variables specified in `resources/`
  - `controllers/`
    - Provides the routing and definitions of various endpoints to view the resources
  - `dto/`
    - Contains pre-written data transfer objects that help speed up the JSON to POJO (plain old Java object) serialization and a fast-fail mechanism in case of bad requests.
  - `models/`
    - Provides the structure of our models, used as our "schema" for our database and also within operations in the service layer.
  - `repositories/`
    - Provides prewritten queries to our MongoDB database alongside access to specific collections within the repository
  - `services/`
    - Provides the business logic for all our data
    - Basically all methods access Firebase Authentication to verify user identities for virtually all resources
- `resources/`
  - `static`
    - Provides our static webpages served at the base URL to GET HTTP requests
  - Contains configuration files such as `secrets.properties` that store user secrets and API keys

All files are properly organized to where there is no overlap, and each directory strictly holds files specific to that task.

Our models are as follows:

- Group:

  - `id: ObjectID // BSON ObjectID for MongoDB`
  - `name: String // name of group`
  - `issueCount: int // number of issues`
  - `issueFrequency: int // frequency of issues in seconds, manually changed`
  - `owner: User // reference to the owner of the group`
  - `members: List<User> // list of members in the group, including the owner`
  - `issues: List<Issue> // list of issues stored in time order`

  - Constructor:

    - `Group()`: Initializes a new instance of the Group class with default values.
    - `Group(String name, User owner)`: Initializes a new instance of the Group class with the specified name and owner.

  - Methods:
    - `setName(String name)`: Sets the name of the group.
    - `setOwner(User user)`: Sets the owner of the group. The user must be a member of the group.
    - `addMember(User user)`: Adds a user to the group if they are not already a member.
    - `removeMember(User user)`: Removes a user from the group if they are not the owner.
    - `getMembers()`: Returns the list of members in the group.
    - `newIssue(String question)`: Creates a new issue with the specified question if there are no existing issues or if the current issue is older than the issue frequency.
    - `currentIssue()`: Returns the current issue of the group, which is the last issue in the list.

- Issue:

  - `id: ObjectID // BSON ObjectID for MongoDB`
  - `issueNumber: int // issue number within the group`
  - `time: LocalDateTime // timestamp of when the issue was created`
  - `question: String // the question or topic of the issue`
  - `group: ObjectID // reference to the group the issue belongs to`
  - `responses: List<Response> // list of responses to the issue`

  - Constructor:

    - `Issue()`: Initializes a new instance of the Issue class with default values.
    - `Issue(Group group, String question)`: Initializes a new instance of the Issue class with the specified group and question.

  - Methods:
    - `addResponse(Response response)`: Adds a response to the issue and returns the added response if successful, or null otherwise.
    - `editResponse(Response response)`: Edits an existing response in the issue and returns the edited response if successful, or null otherwise.
    - `removeResponse(Response response)`: Removes a response from the issue and returns the removed response if successful, or null otherwise.

- Response:

  - `id: ObjectID // BSON ObjectID for MongoDB`
  - `response: String // the content of the response`
  - `user: User // reference to the user who created the response`
  - `group: ObjectID // reference to the group the response belongs to`
  - `issue: ObjectID // reference to the issue the response is associated with`

  - Constructor:
    - `Response()`: Initializes a new instance of the Response class with a default ID.
    - `Response(String response, User user, Group group)`: Initializes a new instance of the Response class with the specified response content, user, and group. It also sets the issue reference to the current issue of the group.

- User:

  - `id: ObjectID // BSON ObjectID for MongoDB`
  - `fId: String // Firebase ID of the user`
  - `name: String // name of the user`
  - `email: String // email of the user`
  - `groups: List<ObjectID> // list of ObjectIDs representing the groups the user belongs to`

  - Constructor:

    - `User()`: Initializes a new instance of the User class with an empty list of groups.
    - `User(ObjectId id, String fId, String name, String email)`: Initializes a new instance of the User class with the specified ID, Firebase ID, name, email, and an empty list of groups.

  - Methods:
    - `joinGroup(Group group)`: Adds the user to the specified group and returns the joined group if successful, or null otherwise.
    - `inGroup(ObjectId group)`: Checks if the user is a member of the specified group and returns true if they are, or false otherwise.
    - `leaveGroup(Group group)`: Removes the user from the specified group and returns true if successful, or false otherwise.

In summary, our chain of references are as follows (ie, fetching a singular group returns the following):

- Group Info (id, name, etc)
- Owner (actual user info, DBRefs)
- Members (DBRefs)
  - List of actual user info
- Issues
  - Issue info (id, time, etc)
  - List of actual responses (DBRefs)
  - Each response contains:
    - Response info (id, response, etc)
    - Actual user info (DBRef)
    - Soft references to issue and group (Object IDs)

Thus, using this design, all the information needed from a group can actually be fetched once, and with smart manipulation on the user agent's end, minimal operations after the initial fetch can be performed.

Note that each model uses Lombok, which provides default getter/setter methods that are overriden as necessary. With an understanding of the basic schema, developing new endpoints and services becomes trivial.

Existing controllers already encompass all models, so no new controllers should be made unless a completely new feature paired with a new model needs to be made. Authorization is delegated to `AuthController.java`, viewing groups is delegated to `GroupController.java`, issues to `IssueController.java`, and so on and so forth.

If new services need to be created, the services are split in the same way as the controllers. If authentication of the user is required at that specific service, include the following line before the body of the method in order to fetch the user object from the list of users in our DataBase:

```java
User user = firebaseService.fetchUser(token);
```

If new queries or aggregations need to be written, do so in the respective repositories in the `repositories/` directory. Note that Spring Boot's MongoDB integration provides many inferences, so a simple method name definition without the `@Query` annotation will suffice for the majority of use cases.

Some final notes:

- ObjectIDs do not properly serialize into string form by Jackson, so the following annotation needs to be included in new models: `@JsonSerialize(using = ObjectIdSerializer.class)`. Refer to `config/` and Jackson JsonSerializers for more information regarding the serializers.
- New endpoints will always require authentication unless ignored in `WebSecurityConfig.java`, including static content served on the main webpage.
- If you would like to replace the current static content in `resources/` using some framework such as React or Svelte, you will have to run their respective build commands and place the built files (often found in `build/`) into the `resources/static/` directory.

This is all you need to begin contributing to this project; read up on Spring Boot/MongoDB documentation, remember that editted Java objects need to be re-saved into the repository, and happy coding! (See [testing](#testing) for deployment information.)

## Testing

**This guide assumes that you have followed the initial setup guide in the main README at the project's base path.**

Navigate to the `backend/` directory. If you do not have any of the following installed, install the necessary applications via a quick google search:

- JDK (17.0.10)
- Apache Maven (3.6.3)

Now, go to `./src/main/resources/` and create a `secrets.properties` file containing the following lines, signing up for the services you do not already have access to via a quick google search:

```properties
spring.data.mongodb.uri=<MongoDB URI/URL>
spring.data.mongodb.database=<Database Name>
firebase.api.key=<Firebase API Key>
```

Once the necessary dependencies and files are installed and created, simply run `mvn spring-boot:run`, and Maven will download the necessary dependencies before running your backend application. This application is exposed to your personal device at `localhost:8080`, and endpoints can be called starting from this URI.

This project is deployed on AWS EC2 - to deploy your own builds, you may do the following:

- Sign up and create an Linux EC2 instance
- Download docker cli

Once that is done, you can run `sudo docker buildx build --platform linux/amd64 -t <name>/canyon:dev .` to build the project, `sudo docker push <name>/canyon:dev` to push the project to Docker Hub, and `sudo docker pull <name>/canyon:dev` on your EC2 instance. `sudo docker run -d -p 80:8080 <name>/canyon:dev` will run the backend quietly on your EC2 instance and forward port 8080 to port 80 so that you can access the backend and website at the base URL without specifying a port number.

## Endpoints

All fields are strings unless otherwise specified.

Example cURL call:

```bash
curl 'joincanyon.org/users' -X POST -H 'Content-Type: application/json' \
--data-binary '{"email": "<email here>", "name": "<name here>", "password": "<password here>"}'
```

### Auth/User Endpoints

**All Other Endpoints Are Authenticated Unless Otherwise Specified!**

- Log in:

  - **POST** /auth
  - body: `{"email", "password"}`
  - returns: `{"token", "expiry"}`

- Sign up:

  - **POST** /users
  - body: `{"name", "email", "password"}`
  - returns: `{"token", "expiry"}`

- **The return token must be stored securely and passed with each authenticated request as an authentication header!**
- To include authentication, create the `Authorization`, `Bearer <token>` key, value pair in the header (remove the brackets around token but include `Bearer `)

### User Endpoints

- Delete user:

  - **DELETE** /users
  - returns: Success code of operation

- Get self information:

  - **GET** /users
  - returns: `{"id", "name", "email", "groups" [string]}`

- Update self information:
  - **PUT** /users
  - body: `{"name", "email", "password"}`
  - returns: `{"token", "expiry"}`
  - note: returns new auth token if password changed, expiry is 0 if password not changed

### Group Endpoints

- Create group:

  - **POST** /groups
  - body: `{"name"}`
  - returns: Created group `{"id", "name", "issueCount" integer, "issueFrequency" integer, "owner" user, "members" [user], "issues" [issue]}`

- Fetch groups user is in

  - **GET** /groups
  - returns: List of groups `[group]`

- Join a group

  - **PUT** /groups/`groupId`
  - returns: Joined group `{"id", "name", "issueCount" integer, "owner", "members" [string], "issues" [issue]}`

- Delete a group

  - **DELETE** /groups/`groupId`
  - returns: Success code of operation

### Issue Endpoints

- Create a new issue:

  - **POST** /issues
  - body: `{"groupId", "question"}`
  - returns: Created issue `{"id", "issueNumber" integer, "date" string yyyy-mm-dd, "question", "group", "response" [response]}`

- Get issues from specified group:

  - **GET** /issues
  - returns: List of issues `[issue]`

### Response Endpoints

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
