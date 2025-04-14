import React from "react";

const MovieCard = ({ movie, isInWatchlist, onToggleWatchlist, showWatchlistButton = true }) => {
  return (
    <div className="col-md-5">
      <div className="content-box-rounded">
        <div className="card-field">
          <h4>{movie.title}</h4>
        </div>
        <div className="card-field">
          <strong>Release Date:</strong>
          <p>{movie.release_date}</p>
        </div>
        {movie.url && (
          <div className="card-field">
            <strong>View on IMDb:</strong>
            <a href={movie.url} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>
        )}
        {showWatchlistButton && (
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => onToggleWatchlist(movie.movie_id)}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
