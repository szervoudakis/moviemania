import React, { useEffect, useState } from "react";
import { fetchYears, getTopMoviesWithWatchlist } from "../services/moviesService";
import MovieCard from "../components/MovieCard";
import YearFilter from "../components/YearFilter";

const Top250Movies = ({ api_url_movies, api_url_years }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [watchlist, setWatchlist] = useState({});

  useEffect(() => {
    const fetchAllYears = async () => {
      const years = await fetchYears(api_url_years);
      setAllYears(years);
    };
    if (api_url_years) {
      fetchAllYears();
    }
  }, [api_url_years]);

  useEffect(() => {
    const fetchMoviesAndWatchlist = async () => {
      const { movies, watchlistMap } = await getTopMoviesWithWatchlist(api_url_movies, selectedYear);
      setTopMovies(movies);
      setWatchlist(watchlistMap);
    };

    if (api_url_movies) {
      fetchMoviesAndWatchlist();
    }
  }, [selectedYear, api_url_movies]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleWatchlistToggle = async (movie_id) => {
    const isInWatchlist = watchlist[movie_id];
    const url = isInWatchlist ? "/movies/watchlist/remove" : "/movies/watchlist/add";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          <YearFilter
            years={allYears}
            selectedYear={selectedYear}
            onChange={setSelectedYear}
          />
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
                {topMovies.slice(0, visibleCount).map((movie) => (
                  <MovieCard
                    key={movie.nid}
                    movie={movie}
                    isInWatchlist={watchlist[movie.movie_id]}
                    onToggleWatchlist={handleWatchlistToggle}
                  />
                ))}
              </div>
              {visibleCount < topMovies.length && (
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
