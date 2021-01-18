import React from "react";

export default function SearchMovies() {
  return (
    <form className="form">
      <label className="label" htmlFor="query">
        Movie Name
      </label>
      <input
        type="text"
        name="query"
        placeholder="i.e Star Wars"
        className="input"
      ></input>
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}
