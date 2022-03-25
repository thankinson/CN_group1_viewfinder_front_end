export const createUser = async (username, email, pass, setter) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_REST_API}create`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    pass: pass,
                }),
            }
        );
        const data = await response.json();
        setter(data.user);
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
        localStorage.setItem("myToken");
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => {
    localStorage.clear();
    window.location.reload(false);
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
        const response = await fetch(
            `${process.env.REACT_APP_REST_API}watchlist`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user,
                    newFilm: film,
                }),
            }
        );
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const listUserFilms = async (setter) => {
    try {
        console.log(
            listUserFilms,
            `Header = Authorization: Bearer ${localStorage.getItem("myToken")}`,
            `await fetch(${process.env.REACT_APP_REST_API}watchlist`
        );
        const response = await fetch(
            `${process.env.REACT_APP_REST_API}watchlist`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("myToken")}`,
                },
            }
        );
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.log(error);
    }
};
