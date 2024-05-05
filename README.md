# User-Auth-Dashboard

## Description

This project consists of a frontend and backend. Follow the steps below to set up and run the project locally.

## Backend Setup

1. Rename `sample.env` to `.env` and fill in the required fields with the appropriate values.
2. Run the following command to install dependencies:

    ```bash
    npm install
    ```

3. Start the development server by running:

    ```bash
    npm run dev
    ```

## Frontend Setup

1. Create a `.env` file in the root directory and specify the backend server address in it.
2. Run the following command to install dependencies:

    ```bash
    npm install
    ```

3. Start the development server by running:

    ```bash
    npm run dev
    ```



# Backend Architecture

The backend of this project is built using Express.js to create a RESTful API for basic user authentication and data retrieval.

## Components

1. **Routes**: Handle incoming HTTP requests and define API endpoints.
   - `authRoutes.js`: Responsible for user authentication routes such as login, signup, and logout.
   - `verifyRoutes.js`: Contains routes for user verification.
   - `dataRoutes.js`: Manages routes for retrieving data.

2. **Controllers**: Implement the business logic for each route.
   - `authController.js`: Contains functions for user authentication.
   - `verifyController.js`: Handles verification-related logic.
   - `dataController.js`: Implements data retrieval logic.

3. **Middleware**: Functions that execute before processing a request.
   - `authMiddleware.js`: Middleware for user authentication.
   - `errorMiddleware.js`: Handles errors gracefully.

4. **Models**: Define database schemas and interact with the database.
   - `User.js`: Model for user data, including authentication details.
