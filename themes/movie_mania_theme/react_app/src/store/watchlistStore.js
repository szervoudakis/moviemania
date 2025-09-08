import { create } from "zustand";

export const useWatchlistStore = create((set) => ({
  watchlist: {},

  toggleMovie: (movie_id) =>
    set((state) => ({
      watchlist: {
        ...state.watchlist,
        [movie_id]: !state.watchlist[movie_id],
      },
    })),

  setWatchlist: (watchlistMap) =>
    set(() => ({
      watchlist: watchlistMap,
    })),
}));
