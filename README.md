# Todo Application with Authentication

A simple Todo application that allows users to add, edit, delete, and mark tasks as completed with authentication functionality.

## Tech Stack

- **Frontend**: React (Vite), Redux, Axios, Material UI (MUI)
- **Backend**: Node.js, Express, JWT (JSON Web Token), MongoDB (Mongoose)

## Set Up

### 1. Clone the Repository
### 2. Set up backend:
        Install Dependencies: npm install
        Create a .env file:
            PORT=3000
            MONGO_URI=your-mongodb-connection-string
            ACCESS_TOKEN_SECRET=your-jwt-secret
        Run seed file: npm run seed
        Run file: npm run dev
### 2. Set up backend:
        Install Dependencies: npm install
        Run file: npm run dev

## Endpoints information:
- **Authentication**:
        POST /auth/register: Register a new user.
        POST /auth/login: Log in a user.
        POST /auth/logout: Log out the current user.
- **Tasks**:
        GET /tasks: Get all tasks for the logged-in user.
        POST /tasks: Create a new task.
        PUT /tasks/:id: Update a task (e.g., mark as completed).
        DELETE /tasks/:id: Delete a task.
