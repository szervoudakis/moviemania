import React, {useEffect, useState} from "react";
import { useWatchlistStore, setWatchlist } from "../store/watchlistStore";
import MovieCard from "../components/MovieCard";
import { fetchWatchlistMovies } from "../services/moviesService";
import { useWatchlistActions } from "../hooks/useWatchlistActions";
import Message from "../components/Message";


const WatchListPage = ()=>{
    const {setWatchlist} = useWatchlistStore();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleToggle, message } = useWatchlistActions();
    useEffect(()=>{
        const loadWatchlist = async () => {
            const data = await fetchWatchlistMovies();
            console.log(data);
            setMovies(data);
            const map = {};
            data.forEach((movie) => {
              map[movie.movie_id] = true;
            });

            setWatchlist(map); // update Zustand store
            setLoading(false);
        };
        loadWatchlist();
    }, []);
    return (
    <div className="container mt-4">
      <h2>My Watchlist</h2>
      {message.text && (
         <Message type={message.type} text={message.text} />
      ) }
      <div className="alert alert-info" role="alert">
      This is your personal watchlist. You can keep track of movies you want to watch later. 
      To remove a movie, just click the watchlist icon again.
    </div>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={movie}
              isInWatchlist={true}
              onToggleWatchlist={() => handleToggle(movie.movie_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListPage;