# PropFTX Assignment

## Project Overview

Welcome to the PropFTX Assignment! Develop a simple movie listing app using the MERN stack with either MongoDB as the database.
***
FrontendURL: https://marvelous-capybara-758fa8.netlify.app/
BackendURL: https://propftx-znmd.onrender.com/


## Technologies

1. `Frontend: React.js`
2. `Backend: Node.js`
3. `Database: MongoDB`
4. `HTTP Server: Express` 

## Project Features:

### 1. User Authentication

Implemented user authentication for secure access to the application. Users can:
- Register a new account with a unique username and password.
- Log in securely with their credentials.
- Access specific pages only when authenticated.

### 2. Data Collection Form

Created a simple form to collect Movie information:
- title
- genre
- releaseDate
- Director

### 3. Movie Display

Display the list of movies present in the database

### 4. Adding a new Movie

Adding a new movie in the database

### 5. Deleting a Movie

Deleting a Movie when passing id in request params in delete request

### 5. Editing a Movie

Editing a Movie when passing id in request params in put request

### Running Locally:

1. Clone the project:

    ```bash
    git clone https://github.com/Abhi0049k/PropFTX.git
    ```

2. Copy the `.env.example` to `.env` for both the backend and frontend.

3. Navigate to the `backend` folder and the `frontend` folder separately and install dependencies:

    ```bash
    cd backend
    npm install
    ```

    ```bash
    cd frontend
    npm install
    ```

4. Run both the backend and frontend:

    ```bash
    npm run dev
    ```