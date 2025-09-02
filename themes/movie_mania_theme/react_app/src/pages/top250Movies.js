import React, { useEffect, useReducer } from "react";
import { fetchYears, getTopMoviesWithWatchlist } from "../services/moviesService";
import MovieCard from "../components/MovieCard";
import YearFilter from "../components/YearFilter";


const initialState = {
   topMovies:[],
   allYears: [],
   selectedYear: "",
   visibleCount:8,
   watchlist: {},
}
//we have one reducer for all the case-states
function reducer(state, action) {
  switch (action.type) {
    case "SET_YEARS":
      return { ...state, allYears: action.payload };
    case "SET_MOVIES":
      return { ...state, topMovies: action.payload.movies, watchlist: action.payload.watchlistMap };
    case "SET_YEAR":
      return { ...state, selectedYear: action.payload, visibleCount: 8 };
    case "LOAD_MORE":
      return { ...state, visibleCount: state.visibleCount + 6 };
    case "TOGGLE_WATCHLIST":
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          [action.payload]: !state.watchlist[action.payload],
        },
      };
    default:
      return state;
  }
}
const Top250Movies = ({ api_url_movies, api_url_years }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //use state for the years
  useEffect(() => {
    const fetchAllYears = async () => {
      const years = await fetchYears(api_url_years);
      dispatch({ type: "SET_YEARS", payload: years });
    };
    if (api_url_years) {
      fetchAllYears();
    }
  }, [api_url_years]);
   //fetching movies and watchlist
   useEffect(() => {
    const fetchMoviesAndWatchlist = async () => {
      const { movies, watchlistMap } = await getTopMoviesWithWatchlist(api_url_movies, state.selectedYear);
      dispatch({ type: "SET_MOVIES", payload: { movies, watchlistMap } });
    };

    if (api_url_movies) {
      fetchMoviesAndWatchlist();
    }
  }, [state.selectedYear, api_url_movies]);

  const handleLoadMore = () => {
    dispatch({ type: "LOAD_MORE" });
  };

  const handleWatchlistToggle = async (movie_id) => {
    const isInWatchlist = state.watchlist[movie_id];
    const url = isInWatchlist ? "/movies/watchlist/remove" : "/movies/watchlist/add";

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_id }),
      });

      dispatch({ type: "TOGGLE_WATCHLIST", payload: movie_id });
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
            years={state.allYears}
            selectedYear={state.selectedYear}
            onChange={(year) => dispatch({ type: "SET_YEAR", payload: year })}
          />
        </div>
        <div className="col-md-10" id="movie-items">
          {state.selectedYear ? (
            <h5>Top Movies until {state.selectedYear}</h5>
          ) : (
            <h5>All Time Top Movies</h5>
          )}

          {state.topMovies.length > 0 ? (
            <>
              <div className="row">
                {state.topMovies.slice(0, state.visibleCount).map((movie) => (
                  <MovieCard
                    key={movie.nid}
                    movie={movie}
                    isInWatchlist={state.watchlist[movie.movie_id]}
                    onToggleWatchlist={handleWatchlistToggle}
                  />
                ))}
              </div>
              {state.visibleCount < state.topMovies.length && (
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
