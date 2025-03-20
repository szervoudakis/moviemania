import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Type:</strong> {movie.field_type}</p>
      <p>{movie.description}</p>
      <a href={movie.url} target="_blank" rel="noopener noreferrer">
        View on IMDb
      </a>
    </div>
  );
};

export default MovieCard;
