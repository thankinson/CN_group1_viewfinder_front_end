export const createUser = async (username, email, pass, setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        pass: pass,
      }),
    });
    const data = await response.json();
    setter(data.User);
    localStorage.setItem("myToken", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, pass, setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        pass: pass,
      }),
    });
    const data = await response.json();
    setter(data.user);
    localStorage.setItem("myToken", data.token);
  } catch (error) {
    console.log(error);
  }
};

export const tokenLogin = async (setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
    });
    const data = await response.json();
    setter(data.user);
    // localStorage.setItem("myToken");
  } catch (error) {
    console.log(error);
  }
};

export const logout = ({ setUser }) => {
  localStorage.clear();
  // window.location.reload(false);
  setUser();
};

export const deleteUser = async (user) => {
  try {
    console.log(localStorage.getItem("myToken"));
    const response = await fetch(
      `${process.env.REACT_APP_REST_API}user/username/${user}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      }
    );
    console.log(response, "2");
    console.log(user, "3");
    localStorage.clear();
    window.location.reload(false);
    await response.json();
    // setter(data);
  } catch (error) {
    console.log(error);
  }
};

export const updatePass = async (user, passUpdate) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
      body: JSON.stringify({
        username: user,
        pass: passUpdate,
      }),
    });
    const data = await response.json();
    if (!data.msg) {
      throw new Error(data.err);
    }
  } catch (error) {
    console.log();
  }
};

export const addFilm = async (user, film) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}watchlist`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        newFilm: film,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const removeFilm = async (user, removedFilm) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}watchlist`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        removefilm: removedFilm,
      }),
    });
    const data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

/*  This function grabs the IDs from a User's watchlist array, 
    then gets the film objects from the API, then the region 
    objects, then extracts the flatrate info from the region objects,
    then updates the movie objects with this data, and finally
    returns the updated object array.*/

export const listUserFilms = async (setter) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}watchlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
    });
    const data = await response.json();

    let movieArr = [];
    for (let id of data) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const movieJSON = await response.json();
        // setWatchlist((watchlist) => [...watchlist, movieJSON]);
        // tempWatchlist = [...tempWatchlist, movieJSON];
        movieArr.push(movieJSON);
      } catch (error) {
        console.log(error);
      }
    }
    for (let i = 0; i < movieArr.length; i++) {
      movieArr[i].netflix = [];
      movieArr[i].amazonPrime = [];
      movieArr[i].disneyPlus = [];
    }

    const regionObjects = [];

    // Here, we want to query for streaming regions using each ID
    // Loop thru returned films
    for (let i = 0; i < movieArr.length; i++) {
      // Fetch region data using id number 'i' from returned films
      const regionResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieArr[i].id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
      );
      // JSONify the data
      const regionJSON = await regionResponse.json();
      // Push to array of region objects
      regionObjects.push(regionJSON);
    }

    // The 'flatrate' key we are interested in is tucked quite far into each region object
    // Loop thru all of the region objects returned
    for (let i = 0; i < regionObjects.length; i++) {
      // for each key-val pair in the array of region objects
      for (const [country, val] of Object.entries(regionObjects[i].results)) {
        // if the object has a flatrate array
        if (val.flatrate) {
          // check each element of flatrate array
          for (let item of val.flatrate) {
            // now we can return regions based on service name
            if (item.provider_name === "Netflix") {
              // console.log('netflix ' + country)
              movieArr[i].netflix.push(country);
            } else if (item.provider_name === "Amazon Prime Video") {
              // console.log('prime ' + country)
              movieArr[i].amazonPrime.push(country);
            } else if (item.provider_name === "Disney Plus") {
              // console.log('disney+ ' + country)
              movieArr[i].disneyPlus.push(country);
            }
          }
        }
      }
    }
    setter(movieArr);
    // setWatchlist(tempWatchlist);
    console.log("createMovieObjectArray set watchlist to:", movieArr);
  } catch (error) {
    console.log(error);
  }
};
