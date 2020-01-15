import React from "react";
import "../../App.css";

const MovieRow = ({ movie }) => {
  return (
    <tr>
      <td> {movie.id} </td>
      <td> {movie.title} </td>
      <td> {movie.year} </td>
      <Attributes items={movie.genres} />
      <Attributes items={movie.directors} />
      <Attributes items={movie.actors} />
    </tr>
  );
};

const Attributes = ({ items }) => {
  const names = items.map(item => item.name);
  return <td>{names.join(", ")}</td>;
};

export default function MovieTableApp({ movies, fetching }) {
  const tableItems = movies.map((movie, index) => (
    <MovieRow key={index} movie={movie} />
  ));

  return fetching ? (
    <table id="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Release year</th>
          <th>Genres</th>
          <th>Directors</th>
          <th>Actors</th>
        </tr>
      </thead>
      <tbody>{tableItems}</tbody>
    </table>
  ) : (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}
