import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Top250Movies from './pages/top250Movies';

function App() {
  const topMoviesRoute = window.drupalSettings.movieMania.topMoviesRoute;
  const top3movies = window.drupalSettings.movieMania.top3movies;
  const username = window.drupalSettings.movieMania.username;
  const api_url_movies = window.drupalSettings.movieMania.topmovies;
  const api_url_years = window.drupalSettings.movieMania.years;

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home top3movies={top3movies} />} />
          <Route path={topMoviesRoute} element={<Top250Movies api_url_movies={api_url_movies} api_url_years={api_url_years} />} />
      </Routes>
    </Router>
  );
}

export default App;
