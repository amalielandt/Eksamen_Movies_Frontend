import React, { useEffect, useState } from "react";
import facade from "../../apiFacade";
import MovieTable from "./MovieTable";
import Search from "./Search";
import "../../App.css";

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await facade.getMovies("all");
        setMovies(data);
        setFetching(true);
      } catch (error) {
        alert("UPSSS " + error.FullError.PromiseValue);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <h2>Movies</h2>
      <br></br>
      <Search setMovies={setMovies} setFetching={setFetching} />
      <br />
      <MovieTable movies={movies} fetching={fetching} />
    </div>
  );
}
