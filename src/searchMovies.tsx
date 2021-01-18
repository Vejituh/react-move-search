import React from "react";
import "./searchMovies.css";

export default function SearchMovies() {
  const searchMovies = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("submiting");

    const query = "Star Wars";

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=301fea267f554470429f50bff9e67513&language=en-GB&query=${query}&page=1&include_adult=false`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form" onSubmit={searchMovies}>
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
