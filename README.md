# Shoe Store Application

This project is a full-stack web application for a shoe store.

## How to Run the Project Locally

This guide will walk you through setting up and running the project on your local machine using a local MongoDB database.

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js and npm:** [Download and Install Node.js](https://nodejs.org/)
- **MongoDB:** [Install MongoDB Community Edition](https://www.mongodb.com/try/download/community)

### Step 1: Set Up the Server

1.  **Start Your Local MongoDB Server:**
    Ensure your MongoDB server is running. You can typically start it by running the `mongod` command in your terminal.

2.  **Navigate to the Server Directory:**
    Open your terminal and go to the `Server` directory.
    ```bash
    cd Server
    ```

3.  **Install Server Dependencies:**
    Install the necessary Node.js packages.
    ```bash
    npm install
    ```

4.  **Start the Server:**
    Run the server using `nodemon`, which will automatically restart on file changes.
    ```bash
    npm start
    ```
    The server will connect to your local MongoDB instance and run on `http://localhost:8080`.

### Step 2: Set Up the Client

1.  **Navigate to the Client Directory:**
    Open a **new terminal window** and go to the `Client` directory.
    ```bash
    cd Client
    ```

2.  **Install Client Dependencies:**
    Install the required packages for the React application.
    ```bash
    npm install
    ```

3.  **Start the Client:**
    Launch the React development server.
    ```bash
    npm start
    ```
    The application will automatically open in your default web browser at `http://localhost:3000`.

### Stopping the Application

- To stop the client or server, press `Ctrl + C` in their respective terminal windows.
- To stop your local MongoDB server, you can typically press `Ctrl + C` in the terminal where it is running.
