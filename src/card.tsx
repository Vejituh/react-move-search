import React from "react";
import "./card.css";

export default function Card(props: any) {
  const getStarRating = () => {
    let starAmount = (props.vote_average / 2 / 5) * 100;
    return starAmount;
  };
  return (
    <div className="card">
      {props.poster_path !== null ? (
        <img
          className="card-poster"
          alt="movie poser"
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${props.poster_path}`}
        />
      ) : null}
      <p className="movie-title">{props.title || props.name}</p>
      <div className="stars-overlay">
        <div
          className="stars-innerlay"
          style={{ width: `${getStarRating()}%` }}
        ></div>
      </div>
    </div>
  );
}
