import React, { useEffect, useState } from "react";
import { fetchData } from "../services/moviesService";

const Top250Movies = ({ api_url_movies, api_url_years }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [watchlist, setWatchlist] = useState({}); // movie_id: 

  // Fetch the data from APIs (years)
  useEffect(() => {
    const fetchDataFromApis = async () => {
      if (api_url_years) {
        const years = await fetchData(api_url_years);
        setAllYears(years);
      }
    };
    fetchDataFromApis();
  }, [api_url_years]);

  // Fetch movies and the user's watchlist when selectedYear or api_url_movies changes
  useEffect(() => {
    const fetchMovies = async () => {
      let url = api_url_movies;
      if (selectedYear) {
        url += `/${selectedYear}`;
      }
      const movies = await fetchData(url);
      setTopMovies(movies);
  
      const initialWatchlist = {};
      // Initialize the watchlist for all movies
      movies.forEach((movie) => {
        initialWatchlist[movie.movie_id] = false;
      });
      console.log("Initial Watchlist:", initialWatchlist);
      try {
        // Fetch user's watchlist
        const res = await fetch("/movies/watchlist/");
        const data = await res.json();
        console.log(data);
  
        // Update the watchlist state based on the user's watchlist
        data.forEach((entry) => {
          if (entry.movie_id in initialWatchlist) {
            initialWatchlist[entry.movie_id] = true; // Mark as in the watchlist
          }
        });
  
        setWatchlist(initialWatchlist);
      } catch (error) {
        console.error("Error fetching user watchlist:", error);
      }
    };
  
    if (api_url_movies) {
      fetchMovies();
    }
  }, [selectedYear, api_url_movies]);

  const handleLoadMore = () => {
    setVisibleMovies((prevCount) => prevCount + 6);
  };

  const handleWatchlistToggle = async (movie_id) => {
    const isInWatchlist = watchlist[movie_id];
    const url = isInWatchlist ? "/movies/watchlist/remove" : "/movies/watchlist/add";

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_id }),
      });

      setWatchlist((prevState) => ({
        ...prevState,
        [movie_id]: !isInWatchlist,
      }));
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  return (
    <div>
      <h2>Top 250 Movies</h2>
      <div className="row">
        <div className="col-md-2">
          <select
            className="form-control"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {allYears.map((yearObj, index) => (
              <option key={index} value={yearObj.release_date}>
                {yearObj.release_date}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-10" id="movie-items">
          {selectedYear ? (
            <h5>Top Movies until {selectedYear}</h5>
          ) : (
            <h5>All Time Top Movies</h5>
          )}
          {topMovies.length > 0 ? (
            <>
              <div className="row">
                {topMovies.slice(0, visibleMovies).map((movie) => (
                  <div className="col-md-5" key={movie.nid}>
                    <div className="content-box-rounded">
                      <div className="card-field">
                        <h4>Title of Movie</h4>
                        <p>{movie.title}</p>
                      </div>
                      <div className="card-field">
                        <h4>Release Date</h4>
                        <p>{movie.release_date}</p>
                      </div>
                      <div className="card-field">
                        <h4>View on IMDb</h4>
                        <a
                          href={movie.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on IMDb
                        </a>
                      </div>
                      <button
                        className="btn btn-outline-primary mt-2"
                        onClick={() => handleWatchlistToggle(movie.movie_id)}
                      >
                        {watchlist[movie.movie_id]
                          ? "Remove from Watchlist"
                          : "Add to Watchlist"}
                      </button>
                       
                    </div>
                  </div>
                ))}
              </div>

              {visibleMovies < topMovies.length && (
                <div className="text-center mt-3">
                  <button className="btn btn-primary" onClick={handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top250Movies;