# TaskFlow API

This is the backend API for TaskFlow, a simple and efficient task management application. It is built with Node.js, Express, and MongoDB, providing a RESTful interface for managing users, tasks, and authentication.

## Features

-   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
-   **Role-Based Access Control**: Differentiates between `user` and `admin` roles, with specific permissions for each.
-   **Full CRUD for Tasks**: Users can create, read, update, and delete their own tasks.
-   **Admin Dashboard**: Admins can view all users and all tasks in the system.
-   **Advanced Task Management**: Includes features like task status updates (pending, in-progress, completed), filtering, and pagination.
-   **Security**: Implements password hashing with `bcryptjs`, and security headers with `helmet`.

## Live Application

-   **Frontend URL**: [https://assignment-6v95.vercel.app](https://assignment-6v95.vercel.app)
-   **Backend API URL**: [https://assignment-hhz1.onrender.com](https://assignment-hhz1.onrender.com)

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [MongoDB](https://www.mongodb.com/) (A local instance or a cloud-based one like MongoDB Atlas)
-   A package manager like `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository** (or download the source code).

2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Set up Environment Variables**:
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=30d
    ```

5.  **Run the server**:
    ```bash
    npm start
    ```
    The API will be running at `http://localhost:5000`.

## API Endpoints

Here is a summary of the available API endpoints. For a detailed, runnable collection, please use the provided Postman collection.

### Authentication (`/api/v1/auth`)

-   `POST /register`: Register a new user.
-   `POST /login`: Log in a user and receive a JWT.
-   `GET /me`: Get the profile of the currently logged-in user.
-   `PUT /me`: Update the profile (name, password) of the currently logged-in user.

### Tasks (`/api/v1/tasks`)

-   `POST /`: Create a new task.
-   `GET /`: Get all tasks for the logged-in user (with filtering and pagination).
-   `GET /:id`: Get a single task by its ID.
-   `PUT /:id`: Update a task by its ID.
-   `DELETE /:id`: Delete a task by its ID.

### Admin (`/api/v1/admin`)

-   `GET /users`: (Admin only) Get a list of all users.
-   `GET /tasks`: (Admin only) Get a list of all tasks in the system.
-   `DELETE /users/:id`: (Admin only) Delete a user by their ID.
-   `PUT /users/:id/role`: (Admin only) Promote a user to the 'admin' role.

---

## A Note on Scalability

This application is built as a monolith, which is suitable for its current scope. However, as the application grows in complexity and user load, several strategies can be employed to ensure scalability:

1.  **Microservices Architecture**: The most significant step would be to break down the monolith into smaller, independent microservices. For example, `UserService`, `TaskService`, and `AuthenticationService`. This allows for independent scaling, development, and deployment of each component. Communication between services could be handled via a message broker like RabbitMQ or Kafka.

2.  **Caching**: A caching layer, such as **Redis**, could be introduced to store frequently accessed data, like user profiles or popular tasks. This would reduce the number of direct database queries, significantly decreasing response times and database load.

3.  **Load Balancing**: To handle an increase in concurrent users, we can run multiple instances of the API server and distribute incoming traffic among them using a load balancer like **Nginx**. This improves availability and reliability.

4.  **Database Optimization**: As the data grows, we can optimize database performance by indexing frequently queried fields in MongoDB. For even larger scale, we could implement database sharding to distribute the data across multiple database servers.
