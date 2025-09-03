import React from 'react';
import { useEffect, useState } from "react";
import { fetchData } from '../services/moviesService';
import MovieCard from "../components/MovieCard"; // Extracted movie UI into a separate component
 
const Home = ({ top3movies }) => {
    const topMoviesRoute = window.drupalSettings.movieMania.topMoviesRoute;
    const username = window.drupalSettings.movieMania.username;
    const [topMovies, setTopMovies] = useState([]);
   
    useEffect(() => {
      if (top3movies) {
        fetchData(top3movies).then((movies) => setTopMovies(movies));
      }
    }, [top3movies]);

  return (
    <div>
      {/* First Section */}
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
        
      {/* Movies Section */}
      <section id="movies" className="movies">
  <h2>Top Movies</h2>
  <div className="movie-list row">
    {topMovies.length > 0 ? (
      topMovies.map((movie) => (
        <MovieCard key={movie.nid} movie={movie} showWatchlistButton={false} />
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
