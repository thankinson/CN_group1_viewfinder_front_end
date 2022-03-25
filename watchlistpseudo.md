# Plan of the Watchlist Page and Related Components

## Imports
Footer and Navbar
React -> useState, useEffect
- useEffect -> check users watchlist on load (REST API call to backend -> /watchlist/ GET)
  - listUserFilms util fetches these
- useEffect -> page title (done)
- useState -> hold user's watchlist in state while using it in the page
- addFilm and removeFilm util will add and remove based on user clicking on the relevant button on the CollapsibleWatchlist component

## Before Return

useEffect -> fetch user's watchlist (initial page load)
    - API call which fetches the film info (title, poster, synopsis)
    - API call which fetches the film's locations (Netflix, iTunes)  
    - store both sets of information
      - push the information into an array, creating an array of objects
        - [{title: the matrix, year: 1999}] etc

[111,222,333]

**function -> fetch user's watchlist**
    - store the API call's objects - film title, image, url, locations
    - (token)
**function -> add to user's watchlist**
    - send PUT to the backend to add to the array on the database
    - refresh the page
    - (user, id)
**function -> remove from user's watchlist**
    - send PATCH to the backend to remove from the array on the database
    - refresh the page
    - (user, id) => function

function -> call API for each film in the watchlist


## Inside Return

Map through user's watchlist and display the movies
Map through the user's watchlist and display the streaming locations