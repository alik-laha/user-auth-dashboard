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
   - `userRoute.ts`: Responsible for user authentication routes such as login, signup, and logout.

2. **Controllers**: Implement the business logic for each route.
   - `login,logout.ts`: Contains functions for user authentication.
   - `verify.ts`: Handles verification-related logic.
   - `getData.ts`: Implements data retrieval logic.

3. **Middleware**: Functions that execute before processing a request.
   - `checkUser.ts`: Middleware for user authentication.
   

4. **Models**: Define database schemas and interact with the database.
   - `UserModel.ts`: Model for user data, including authentication details.
   - `deviceinfoModel.ts` :Model for store user browser device all data
   - `verificationModel.ts` :For verification detail 
5. **Helper**: Functions that execute on Call for mail.
   - `mailler.ts`: for sending mail on login logout and verification code.
   
