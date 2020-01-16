import React, { useState, useEffect } from "react";
import facade from "../../apiFacade";
import AddMovie from "./AddMovie";
import "../../App.css";

const MovieOption = ({ movie }) => {
  return <option value={movie.id}> {movie.title} </option>;
};

export default function AdminApp() {
  const emptyMovie = {
    title: "",
    year: "",
    votes: ""
  };
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(emptyMovie);
  const [isSelected, setIsSelected] = useState(true);
  const [movies, setMovies] = useState([]);

  const movieOptions = movies.map((movie, index) => (
    <MovieOption key={index} movie={movie} />
  ));

  const deleteMovie = async id => {
    try {
      await facade.deleteMovie(id);
      getMovies();
    } catch (error) {
      alert("UPSSS " + error);
    }
  };

  const addMovie = async movie => {
    try {
      const data = await facade.addMovie(movie);
      setMovie(data);
      alert("The movie has been saved");
    } catch (error) {
      alert("UPSSS " + error);
    }
  };

  const getMovies = async () => {
    try {
      const data = await facade.getMovies("all");
      setMovies(data);
    } catch (error) {
      alert("UPSSS " + error);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await facade.getMovies("all");
        setMovies(data);
      } catch (error) {
        alert("UPSSS " + error);
      }
    };
    getMovies();
  }, [movie]);

  const onChange = evt => {
    setMovieId(evt.target.value);
    setIsSelected(false);
  };

  const submit = event => {
    event.preventDefault();
    setIsSelected(true);
    deleteMovie(movieId);
    setMovieId("");
  };

  return (
    <div>
      <AddMovie addMovie={addMovie} movie={movie} emptyMovie={emptyMovie} />
      <form>
        <br />
        <select id="selected" value={movieId} onChange={onChange}>
          <option defaultValue hidden>
            Select a movie
          </option>
          {movieOptions}
        </select>
        <button onClick={submit} disabled={isSelected}>
          Delete
        </button>
      </form>
    </div>
  );
}
