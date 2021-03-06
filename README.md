# M3 - `README.md` Example

<br>

# MyRoomie App

<br>

## Description

MyRoomie is an app for roommates. It is not a roommate finder. It is an app to improve coexistence with your room mates. In it, you will be able to see expenses, bills, a shopping list, household chores, coexistence rules and much more ...

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up to the app so that I can start creating my own spaces
- **Login:** As a user I can login to the app so that I can see my spaces and manage them
- **Logout:** As a user I can logout from the app so no one else can use it
- **View Spaces** As a user I want to see a list of my space and also a view of each space individually
- **Add Spaces** As a user I can add a space
- **Edit Spaces** As a user I can edit a space
- **Delete Spaces** As a user I can delete a space
- **Add Expenses** As a user I can add Expenses to a space
- **Delete Expenses** As a user I can remove Expenses from a space
- **Add Bills** As a user I can add Bills to a space
- **Delete Bills** As a user I can remove Bills from a space
- **Add Shopping list** As a user I can add Shopping list to a space
- **Delete Shopping list** As a user I can remove Shopping list from a space
- **Add Tasks** As a user I can add tasks to a space
- **Delete Tasks** As a user I can remove tasks from a space
- **Add Chores** As a user I can add chores to a space
- **Delete Chores** As a user I can remove chores from a space
- **View User profile** As a user I can see my profile
- **Edit User profile** As a user I can edit my profile

## Backlog

- delete user profile
- upload documents
- download documents
- Add calendar with data
- Join to spaces with password
- details of the month
- social login
- ...

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                      | Component                   | Permissions                | Behavior                                                                                   |
| ------------------------- | --------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| `/`                       | HomePage                    | public `<Route>`           | Home page                                                                                  |
| `/signup`                 | SignupPage                  | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup                              |
| `/login`                  | LoginPage                   | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login                               |
| `/spaces`                 | SpacesListPage              | user only `<PrivateRoute>` | Page that shows all user´s spaces in a list                                                |
| `/spaces/create`          | AddSpacesForm               | user only `<PrivateRoute>` | New space form, adds a new space and redirects to spaces list once space has been added    |
| `/space/:id`              | SpaceDetailPage             | user only `<PrivateRoute>` | Page with the details of a space, an edit form, the tasks list, bills, expenses, chores... |
| `/space/:id/tasks`        | SpaceDetailPageTask         | user only `<PrivateRoute>` | Page with the details of a tasks, an create, delete tasks.                                 |
| `/space/:id/expenses`     | SpaceDetailPageExpenses     | user only `<PrivateRoute>` | Page with the details of a expenses, an create, delete expenses.                           |
| `/space/:id/chores`       | SpaceDetailPageChores       | user only `<PrivateRoute>` | Page with the details of a chores, an create, delete chores.                               |
| `/space/:id/shoppingList` | SpaceDetailPageShoppingList | user only `<PrivateRoute>` | Page with the details of a shopping list, an create, delete.                               |
| `/space/:id/calendar`     | SpaceDetailPageCalendar     | user only `<PrivateRoute>` | Page with the details of a calendar an create, delete.                                     |
| `/space/:id/bills`        | SpaceDetailPageBills        | user only `<PrivateRoute>` | Page with the details of a bills an create, delete.                                        |
| `/profile`                | ProfilePage                 | user only `<PrivateRoute>` | Shows the user profile, that also renders an edit form                                     |

## Components

- HomePage

- LoginPage

- SignupPage

- SpacesListPage

  - SpaceCard
  - DeleteSpaceButton

- CreateSpaceForm

- SpaceDetailPage
  - Tasks Icon
  - Expenses Icon
  - Calendar Icon
  - Shopping List Icon
  - Documents Icon
  - Chores Icon
  - Delete button Space
- ProfilePage

  - EditProfileForm

- Routes

  - AnonRoute
  - PrivateRoute

- Common
  - Modals
  - Forms
  - Navbar
  - Footer
  - Button...

## Services

- Auth Service

  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Spaces Service
  - spacesApi.list()
  - spacesApi.createSpace(Space)
  - spacesApi.getSpaceDetails(SpaceId)
  - spacesApi.editSpace(SpaceId, SpaceBody)
  - spacesApi.deleteSpace(SpaceId)
- Tasks Service
  - tasksApi.addTask(spaceId, taskBody)
  - tasksApi.deleteTask(spaceId, taskId)
- Expenses Service
  - expensesApi.addExpen(spaceId, expenBody)
  - expensesApi.deleteExpen(spaceId, expenId)
- Shopping List Service
  - ShoppingListApi.addShopping(spaceId, shoppingBody)
  - tasksApi.deleteShopping(spaceId, shoppingId)
- Documents Service
  - docsApi.addDocs(spaceId, docsBody)
  - docsApi.deleteDocs(spaceId, docsId)
- Chores Service
  - choresApi.addChores(spaceId, choresBody)
  - choresApi.deleteChores(spaceId, choresId)

<br>

# Server / Backend

## Models

User model

```javascript
{
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  img: {type: String}
  rol: {type: String, default: "Admin"}
  spaces: [ { type: mongoose.Schema.Types.ObjectId, ref: "Spaces" } ]
}
```

Space model

```javascript
{
  title: String,
  description: String,
  users: [ {type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  tasks: [ { type: mongoose.Schema.Types.ObjectId, ref: "Task" } ],
  expenses: [ { type: mongoose.Schema.Types.ObjectId, ref: "Expenses" } ],
  calendar: [ { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" } ],
  documents: [ { type: mongoose.Schema.Types.ObjectId, ref: "Documents" } ],
  chores: [ { type: mongoose.Schema.Types.ObjectId, ref: "Chores" } ],
  listShopping: [ { type: mongoose.Schema.Types.ObjectId, ref: "List Shopping" } ],
},
```

Task model

````javascript
{
  name: String,
  description: String,
  assignedTo: {type : mongoose.Schema.Types.ObjectId, ref: "Users" }
},

Expenses model

```javascript
{
  name: String,
  description: String,
  price: Number,
},

Calendar model

```javascript
{
  name: String,
  description: String,
  createdBy: {type : mongoose.Schema.Types.ObjectId, ref: "Users" },
},

List Shopping model

```javascript
{
  name: String,
  description: String,
  status: Boolean,
},


Documents model

```javascript
{
  name: String,
  description: String,
  url: String
},

Chores model

```javascript
{
  name: String,
  description: String,
  createdBy: {type : mongoose.Schema.Types.ObjectId, ref: "Users" }
},
````

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                                     | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`         | {name, lastName, img, username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}                             | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         | (empty)                                          | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/spaces`          |                                                  |                | 400          | Sends all spaces                                                                                                                |
| GET         | `/api/spaces/:spaceId` | {id}                                             |                |              | Sends one specific space with its tasks (if any)                                                                                |
| POST        | `/api/spaces`          | {title, description}                             | 201            | 400          | Create and saves a new space in the DB                                                                                          |
| PUT         | `/api/spaces/:spaceId` | {title, description}                             | 200            | 400          | Edits space in the DB                                                                                                           |
| DELETE      | `/api/spaces/:spaceId` | {id}                                             | 201            | 400          | Deletes space                                                                                                                   |

POST | `/api/spaces/:spaceId/tasks` | {name,description, status} | 200 | 404 | Adds a new task to a specific space |
| PUT | `/api/tasks/:taskId` | {name,description, status} | 201 | 400 | Edits a task in the DB |
| DELETE | `/api/tasks/:taskId` | {id} | 200 | 400 | Deletes task |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/hB7gO89T/mvp-final-project)

### Git

The url to your repository and to your deployed space

[Client repository Link](https://github.com/projav23/ProjectFinal-client)

[Server repository Link](https://github.com/projav23/projectFinal-api)

[Deployed App Link](http://netlify.com)

### WireFrames

<img src="https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C578639c0f06e4393986f9f8cf4e1c6a5/projects/Mc7bae173775282b2aa1d7f5c74d3f1961614692736977/pages/5f55b16f13554136ab8e6207ecf9ec93/image/5f55b16f13554136ab8e6207ecf9ec93.png?1615030103906" alt="wireframes>
