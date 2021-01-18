import React, { useState } from "react";
import "./searchMovies.css";
import Card from "./card";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=301fea267f554470429f50bff9e67513&language=en-GB&query=${query}&page=1&include_adult=false`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setQuery(value);
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          type="text"
          name="query"
          placeholder="i.e Star Wars"
          className="input"
          value={query}
          onChange={handleChange}
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {console.log(movies)}
        {movies
          .filter((movie: any) => movie.vote_count > 30)
          .sort((a: any, b: any) => Number(a.id) - b.id)
          .map((movie: any) => (
            <Card key={movie.id} {...movie} />
          ))}
      </div>
    </>
  );
}
