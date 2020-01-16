import React, { useState } from "react";
import "../../App.css";
import { Prompt } from "react-router-dom";

export default function AddMovie({ addMovie, movie, emptyMovie }) {
  let [isBlocking, setIsBlocking] = useState(false);
  const [newMovie, setNewMovie] = useState({ ...movie });

  const handleChange = event => {
    setIsBlocking(true);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addMovie(newMovie);
    setNewMovie({ ...emptyMovie });
    setIsBlocking(false);
  };

  return (
    <div>
      <br />
      <br />
      <h3>Add Movie</h3>
      <p>{isBlocking ? "Remember to save before you leave this page" : " "}</p>
      <p>{newMovie.id}</p>
      <input
        name="title"
        value={newMovie.title}
        onChange={handleChange}
        placeholder="Movie title"
      />
      <br />
      <input
        name="year"
        type="number"
        value={newMovie.year}
        onChange={handleChange}
        placeholder="Release year"
      />
      <br />
      <input
        name="votes"
        type="number"
        value={newMovie.votes}
        onChange={handleChange}
        placeholder="Votes"
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Save</button>
      <Prompt
        when={isBlocking}
        message={location =>
          `You have not yet saved your new movie, are you sure you want to go to ${location.pathname}?`
        }
      />
    </div>
  );
}
