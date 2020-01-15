import React, { useState } from "react";
import facade from "../../apiFacade";
import "../../App.css";

export default function SearchApp(props) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [category, setCategory] = useState("id");
  const [search, setSearch] = useState("");

  const submit = event => {
    event.preventDefault();
    props.setFetching(false);
    setSearch("");
    setIsEmpty(true);
    getMovies(category, search);
  };

  const onChange = evt => {
    if (evt.target.id === "category") {
      setCategory(evt.target.value);
    } else {
      setSearch(evt.target.value);
      setIsEmpty(false);
    }
  };

  const getMovies = async (category, search) => {
    try {
      let data = "";
      if (category === "id") {
        data = await facade.getMovies(search);
      } else {
        data = await facade.getMovies(category + "/" + search);
      }
      props.setMovies(data);
      props.setFetching(true);
    } catch (error) {
      alert("UPSSS " + error);
    }
  };

  return (
    <div>
      <form>
        <select id="category" value={category} onChange={onChange}>
          <option value="id" defaultValue hidden>
            Select a category
          </option>
          <option value="id">Id</option>
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="director">Director</option>
          <option value="actor">Actor</option>
        </select>
        &nbsp;&nbsp;
        <input
          id="search"
          placeholder="Search"
          value={search}
          onChange={onChange}
          type={category === "id" ? "number" : "text"}
        />
        <button onClick={submit} disabled={isEmpty}>
          Search
        </button>
      </form>
    </div>
  );
}
