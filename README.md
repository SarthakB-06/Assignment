# TaskFlow: A Full-Stack Task Management Application

TaskFlow is a complete MERN stack (MongoDB, Express, React, Node.js) application designed for efficient task management. It features a secure RESTful API backend and a responsive, user-friendly frontend built with React and Vite.

## Live Application

-   **Frontend URL**: [https://assignment-6v95.vercel.app](https://assignment-6v95.vercel.app)
-   **Backend API URL**: [https://assignment-hhz1.onrender.com](https://assignment-hhz1.onrender.com)

## Project Structure

This repository is a monorepo containing two main projects:

-   `backend/`: The Node.js/Express.js REST API server.
-   `client/`: The React/Vite single-page application.

---

## Backend (`/backend`)

The backend is a robust Node.js application built with Express that provides all the necessary API endpoints for the TaskFlow application.

### Features

-   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
-   **Role-Based Access Control**: Differentiates between `user` and `admin` roles, with specific permissions for each.
-   **Full CRUD for Tasks**: Users can create, read, update, and delete their own tasks.
-   **Admin Dashboard**: Admins can view all users and all tasks in the system.
-   **Advanced Task Management**: Includes features like task status updates (pending, in-progress, completed), filtering, and pagination.
-   **Security**: Implements password hashing with `bcryptjs`, security headers with `helmet`, and rate limiting.

### Getting Started

1.  **Navigate to the backend directory**: `cd backend`
2.  **Install dependencies**: `npm install`
3.  **Set up Environment Variables**: Create a `.env` file in the `backend` directory with the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=30d
    ```
4.  **Run the server**: `npm start`

### API Endpoints

A Postman collection is available ([TaskFlow_Final_Postman_Collection.postman_collection.json](TaskFlow_Final_Postman_Collection.postman_collection.json)) for detailed API testing.

-   **Auth**: `/api/v1/auth` (register, login, me)
-   **Tasks**: `/api/v1/tasks` (CRUD operations)
-   **Admin**: `/api/v1/admin` (user and task management)
-   you can see the admin panel by logging with - Rahul@gmail.com (password : 123456)

---

## Frontend (`/client`)

The frontend is a modern and responsive single-page application built with React and Vite.

### Features

-   User login and registration forms.
-   A dashboard for users to manage their tasks.
-   An admin panel for administrators to manage all users and tasks.
-   Token-based authentication management.
-   Protected routes for authenticated users and admins.

### Getting Started

1.  **Navigate to the client directory**: `cd client`
2.  **Install dependencies**: `npm install`
3.  **Run the development server**: `npm run dev`
    The application will be available at `http://localhost:5173`.

---

## A Note on Scalability

This application is built as a monolith, which is suitable for its current scope. However, as the application grows, several strategies can be employed to ensure scalability:

1.  **Microservices Architecture**: Break down the monolith into smaller, independent services (e.g., `UserService`, `TaskService`) to allow for independent scaling and deployment.
2.  **Caching**: Introduce a caching layer like **Redis** to store frequently accessed data, reducing database load and improving response times.
3.  **Load Balancing**: Use a load balancer like **Nginx** to distribute traffic across multiple instances of the API server, improving availability.
4.  **Database Optimization**: Implement database indexing and, for larger scale, sharding to optimize database performance.
