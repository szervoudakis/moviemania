import React, { useEffect, useState } from "react";
import { fetchData } from "../services/moviesService";

const Top250Movies = ({ api_url_movies, api_url_years }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [visibleMovies, setVisibleMovies] = useState(6); // Set 6 movies initially

  // Fetch the data from APIs (movies and years)
  useEffect(() => {
    const fetchDataFromApis = async () => {
      if (api_url_years) {
        const years = await fetchData(api_url_years);
        setAllYears(years);
      }
    };
    fetchDataFromApis();
  }, [api_url_years]);

  // Fetch movies when selectedYear or api_url_movies changes
  useEffect(() => {
    const fetchMovies = async () => {
      let url = api_url_movies;
      
      if (selectedYear) {
        // Add the year to the API URL if selected
        url += `/${selectedYear}`;
      }
      const movies = await fetchData(url);
      setTopMovies(movies);
    };

    if (api_url_movies) {
      fetchMovies();
    }
  }, [selectedYear, api_url_movies]); // Trigger fetch on selectedYear or api_url_movies change

  const handleLoadMore = () => {
    setVisibleMovies((prevCount) => prevCount + 6);
  };

  return (
    <div>
      <h2>Top 250 Movies</h2>
      <div className="row">
        {/* Filters */}
        <div className="col-md-2">
          <select
            className="form-control"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)} // Set the selected year
          >
            <option value="">All Years</option>
            {allYears.map((yearObj, index) => (
              <option key={index} value={yearObj.release_date}>
                {yearObj.release_date}
              </option>
            ))}
          </select>
        </div>
        {/* Movies Grid */}
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
                      <a href={movie.url} target="_blank" rel="noopener noreferrer">
                       View on IMDb
                      </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
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
