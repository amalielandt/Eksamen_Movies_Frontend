import URL from "./Settings";

const url = URL; //CHANGE WHEN PUT UP

function handleHttpErrors(res) {
  if (!res.ok) {
    console.log(res.json());
    return Promise.reject({ status: res.status, fullError: res });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const getTokenInfo = () => {
    let jwt = localStorage.getItem("jwtToken");
    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password
    });
    return fetch(url + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const addMovie = body => {
    const options = makeOptions("POST", true, body); //True add's the token
    return fetch(url + "/api/movie", options).then(handleHttpErrors);
  };

  const editMovie = (id, body) => {
    const options = makeOptions("PUT", true, body); //True add's the token
    return fetch(url + "/api/movie/" + id, options).then(handleHttpErrors);
  };

  const deleteMovie = id => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(url + "/api/movie/" + id, options).then(handleHttpErrors);
  };

  const addToMovie = (item, movie_id, item_id) => {
    const options = makeOptions("PUT", true); //True add's the token
    return fetch(
      url + "/api/movie/" + item + "/" + movie_id + "/" + item_id,
      options
    ).then(handleHttpErrors);
  };

  const removeFromMovie = (item, movie_id, item_id) => {
    const options = makeOptions("DELETE", true); //True add's the token
    return fetch(
      url + "/api/movie/" + item + "/" + movie_id + "/" + item_id,
      options
    ).then(handleHttpErrors);
  };

  async function getMovies(endpoint) {
    const data = await fetch(url + "/api/movie/" + endpoint).then(
      handleHttpErrors
    );
    return data;
  }

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    addMovie,
    editMovie,
    deleteMovie,
    addToMovie,
    removeFromMovie,
    getTokenInfo,
    getMovies
  };
}
const facade = apiFacade();
export default facade;
