import React, { useState, useEffect } from "react";
import "./searchMovies.css";
import Card from "./card";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [inCinema, setInCinema] = useState([]);

  useEffect(() => {
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=301fea267f554470429f50bff9e67513`;
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=301fea267f554470429f50bff9e67513&language=en-GB&page=1&region=GB`;
    const inCinemaUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=301fea267f554470429f50bff9e67513&language=en-GB&page=1&region=GB`;
    const fetchTrending = async () => {
      try {
        const response = await fetch(trendingUrl);
        const data = await response.json();
        setTrending(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(upcomingUrl);
        const data = await response.json();
        setUpcoming(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
    const fetchInCinemas = async () => {
      try {
        const response = await fetch(inCinemaUrl);
        const data = await response.json();
        setInCinema(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
    fetchUpcoming();
    fetchInCinemas();
  }, []);

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
          required
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          ? movies
              .filter((movie: any) => movie.vote_count > 30)
              .sort((a: any, b: any) => Number(a.id) - b.id)
              .map((movie: any) => <Card key={movie.id} {...movie} />)
          : null}
      </div>
      <h1>Trending</h1>
      <div className="card-list">
        {trending.map((movie: any) => (
          <Card key={movie.id} {...movie} />
        ))}
      </div>
      <h1>Now in Cinemas</h1>
      <div className="card-list">
        {inCinema.map((movie: any) =>
          movie.poster_path ? <Card key={movie.id} {...movie} /> : null
        )}
      </div>
      <h1>Coming Soon</h1>
      <div className="card-list">
        {upcoming.map((movie: any) =>
          movie.poster_path ? <Card key={movie.id} {...movie} /> : null
        )}
      </div>
    </>
  );
}
