import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const topMoviesRoute = window.drupalSettings.movieMania.topMoviesRoute;
  const top3movies = window.drupalSettings.movieMania.top3movies;
  const username = window.drupalSettings.movieMania.username;
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home top3movies={top3movies} />} />
      </Routes>
    </Router>
  );
}

export default App;
