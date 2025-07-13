# Shoe Store - Full-Stack E-commerce Application

This is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). The project serves as a portfolio piece to demonstrate skills in both front-end and back-end development.

![Homepage Screenshot](Client/public/home-background.jpg)

## Features

- **Product Catalog:** Browse a variety of shoes, with images and details.
- **Shopping Cart:** Add and remove items from the cart.
- **Order Placement:** A simulated order process.
- **RESTful API:** A back-end server that provides data to the front-end.

## Technologies Used

### Front-End
- **React:** A JavaScript library for building user interfaces.
- **React Router:** For client-side routing.
- **CSS:** Custom styling for components.

### Back-End
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing product and order information.
- **Mongoose:** An ODM library for MongoDB and Node.js.
- **CORS:** For enabling cross-origin resource sharing.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** installed and running. You can use a local instance or a cloud service like MongoDB Atlas.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your_username/your_repository_name.git
    cd your_repository_name
    ```

2.  **Install Server Dependencies:**
    ```sh
    cd Server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```sh
    cd ../Client
    npm install
    ```

4.  **Configure Environment Variables:**
    The server requires a MongoDB connection string. You will need to set this up. (Note: You may need to add a `.env` file to the `Server` directory for this).

### Running the Application

1.  **Start the Back-End Server:**
    From the `Server` directory, run:
    ```sh
    npm start
    ```
    The server will start on `http://localhost:5000` (or the port you configure).

2.  **Start the Front-End Development Server:**
    From the `Client` directory, run:
    ```sh
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

## Project Structure

```
.
├── Client/         # React front-end
│   ├── public/
│   └── src/
├── Server/         # Node.js/Express back-end
│   ├── models/
│   └── server.js
└── README.md
```