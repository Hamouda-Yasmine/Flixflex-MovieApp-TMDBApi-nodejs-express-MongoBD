





# FlexFlix Movie App Backend

This is the backend application for the Movie App project. It provides endpoints to interact with movie and TV show data, user authentication, and user favorites.

## Table of Contents
- [FlexFlix Movie App Backend](#flexflix-movie-app-backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
  - [Favorites](#favorites)
  - [Search](#search)
  - [Movie and TV Show Details](#movie-and-tv-show-details)
  - [Pagination](#pagination)
  - [Top Movies and TV Shows](#top-movies-and-tv-shows)
  - [Error Handling](#error-handling)
  - [Contributing](#contributing)
 

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account (for database)

### Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB Atlas cluster and update the connection string in `connectBD.ts`.
4. Obtain a TMDB API key and update the `apiKey` variable in `index.ts`.

## Endpoints

- `POST /signup`: User registration.
- `GET /movies`: Get a list of movies.
- `GET /tv`: Get a list of TV shows.
- `GET /movies/top`: Get the top 5 most rated movies.
- `GET /tv/top`: Get the top 5 most rated TV shows.
- `GET /moviesPagination`: Get a paginated list of movies.
- `GET /tvPagination`: Get a paginated list of TV shows.
- `POST /add-favorite`: Add a movie or TV show to the user's favorites.
- `DELETE /delete-favorite`: Remove a movie or TV show from the user's favorites.
- `GET /favorites/:userId`: Get the list of user's favorite movies and TV shows.
- `GET /search/movie`: Search for movies based on a query.
- `GET /moviedetail/:id`: Get details of a specific movie.
- `GET /tv/:id`: Get details of a specific TV show.

## User Authentication

- Endpoint: `POST /signup`
  - Create a new user account.

## Favorites

- Endpoint: `POST /add-favorite`
  - Add a movie or TV show to the user's favorites.

- Endpoint: `DELETE /delete-favorite`
  - Remove a movie or TV show from the user's favorites.

- Endpoint: `GET /favorites/:userId`
  - Get the list of user's favorite movies and TV shows.

## Search

- Endpoint: `GET /search/movie`
  - Search for movies based on a query.

## Movie and TV Show Details

- Endpoint: `GET /moviedetail/:id`
  - Get details of a specific movie.

- Endpoint: `GET /tv/:id`
  - Get details of a specific TV show.

## Pagination

- Endpoint: `GET /moviesPagination`
  - Get a paginated list of movies.

- Endpoint: `GET /tvPagination`
  - Get a paginated list of TV shows.

## Top Movies and TV Shows

- Endpoint: `GET /movies/top`
  - Get the top 5 most rated movies.

- Endpoint: `GET /tv/top`
  - Get the top 5 most rated TV shows.

## Error Handling
- 200 OK: Successful request.
- 404 Not Found: When a requested resource is not found.
- 500 Internal Server Error: For unexpected server errors.

## Contributing

Feel free to contribute to this project. Create a pull request with your changes.


