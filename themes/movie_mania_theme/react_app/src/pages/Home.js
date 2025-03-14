import React from 'react';
import { useEffect, useState } from "react";
import { fetchTopMovies } from '../services/top3MovieService';
  
const Home = ({ top3movies }) => {
    const topMoviesRoute = window.drupalSettings.movieMania.topMoviesRoute;
    const username = window.drupalSettings.movieMania.username;
    const [topMovies, setTopMovies] = useState([]);
  
    useEffect(() => {
      if (top3movies) {
        fetchTopMovies(top3movies).then((movies) => setTopMovies(movies));
      }
    }, [top3movies]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Moviemania {username}</h1>
        <p>Your one-stop destination for the latest movies, ratings, and reviews.</p>
        <a href={topMoviesRoute} className="cta-button">Discover Movies</a>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Moviemania</h2>
        <p>
          Moviemania, powered by Drupal, is a robust movie management system designed to efficiently fetch, store,
          and display movie data. It combines modern development practices and a user-friendly design to offer a seamless experience.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <ul>
          <li>Custom Drupal modules for streamlined movie data management</li>
          <li>AJAX-powered movie filtering for quick searches</li>
          <li>Real-time API integration with dynamic updates</li>
          <li>Custom theming for a modern and clean interface</li>
        </ul>
      </section>

      {/* Movies Section */}
      <section id="movies" className="movies">
      <h2>Top Movies</h2>
      <div className="movie-list">
        {topMovies.length > 0 ? (
          topMovies.map((movie) => (
            <div key={movie.nid} className="movie-card">
              <h3>{movie.title}</h3>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Type:</strong> {movie.field_type}</p>
              <p>{movie.description}</p>
              <a href={movie.url} target="_blank" rel="noopener noreferrer">
                View on IMDb
              </a>
            </div>
          ))
        ) : (
          <p>Loading top movies...</p>
        )}
      </div>
    </section>

    </div>
  );
}

export default Home;
