import { useState } from "react";
import { useWatchlistStore } from "../store/watchlistStore";
import { toggleWatchlist } from "../services/moviesService";

export const useWatchlistActions = () => {
  const { watchlist, toggleMovie } = useWatchlistStore();
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleToggle = async (movie_id) => {
    const isInWatchlist = watchlist[movie_id];
    const { success, message: msg } = await toggleWatchlist(movie_id,isInWatchlist);

    if (success) {
      toggleMovie(movie_id);
    }

    setMessage({ type: success ? "success" : "error", text: msg });
  };

  return { handleToggle, message };
};
