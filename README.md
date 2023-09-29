# MovieWizard Server (Backend)

## Description

The MovieWizard Server is the backend component of the MovieWizard project. It serves as the API responsible for managing movie data.

**IMPORTANT:** This repository contains the backend code (Express API).

A repository with the frontend code (React) can be found here: [MovieWizard Frontend](#https://github.com/MovieWizard/MovieWizard-client)

## Getting Started

### Instructions to Run this App on Your Computer

To run this application on your computer, follow these steps:

1. Clone this repository to your local machine.

2. Navigate to the project directory in your terminal.

3. Install the required dependencies by running the following command:
   `npm install`

4. Set up the necessary environment variables. You must define the following environment variables in a `.env` file or your hosting environment:

- `MONGO_URI`: MongoDB connection string
- `TOKEN_SECRET`: Secret key for JWT token generation

5. Start the server by running the following command:
   `npm run dev`
6. The server should now be running locally. You can access the API at [http://localhost:YOUR_PORT](http://localhost:YOUR_PORT).

## Endpoints

### Auth Endpoints

| Endpoint            | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `POST /auth/signup` | Create a new user in the database.                      |
| `POST /auth/login`  | Verify email and password and return a JWT token.       |
| `GET /auth/verify`  | Used to verify JWT stored on the client.                |
| `GET /auth/profile` | Get user profile information (requires authentication). |

### Movies Endpoints

| Endpoint                  | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `GET /movies`             | Get a list of all movies.                                       |
| `GET /movies/:movieId`    | Get details of a specific movie.                                |
| `POST /movies`            | Create a new movie (requires authentication).                   |
| `PUT /movies/:movieId`    | Update a movie (requires authentication).                       |
| `DELETE /movies/:movieId` | Delete a movie (requires authentication).                       |
| `GET /my-movies`          | Get movies added by the current user (requires authentication). |
| `GET /search`             | Get search results for movies.                                  |
| `GET /filters`            | Get filtered movie results based on criteria.                   |

### Lists Endpoints

| Endpoint                             | Description                                                       |
| ------------------------------------ | ----------------------------------------------------------------- |
| `GET /mood-lists`                    | Get all mood lists (requires authentication).                     |
| `POST /mood-lists`                   | Create a new mood list (requires authentication).                 |
| `GET /mood-lists/:moodListId`        | Get details of a specific mood list (requires authentication).    |
| `PUT /mood-lists/:moodListId/add`    | Update a mood list by adding a movie (requires authentication).   |
| `PUT /mood-lists/:moodListId/remove` | Update a mood list by removing a movie (requires authentication). |

## Demo

You can test the deployed version of the MovieWizard API using the following link:
[MovieWizard API](#https://movie-wizard.adaptable.app/)
