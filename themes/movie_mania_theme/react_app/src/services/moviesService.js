export const fetchData = async (API_URL) => {
    if (typeof API_URL !== "string" || API_URL.trim() === "") {
      console.error("Invalid API URL provided");
      return [];
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return JSON.parse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};
export const fetchYears = async (url) => {
  return await fetchData(url);
};
export const getTopMoviesWithWatchlist = async (baseUrl, selectedYear) => {
  let url = baseUrl;
  if (selectedYear) {
    url += `/${selectedYear}`;
  }

  const movies = await fetchData(url);

  const watchlistMap = {};
  movies.forEach((movie) => (watchlistMap[movie.movie_id] = false));

  try {
    const res = await fetch("/movies/watchlist/");
    const data = await res.json();
    data.forEach((entry) => {
      if (watchlistMap.hasOwnProperty(entry.movie_id)) {
        watchlistMap[entry.movie_id] = true;
      }
    });
  } catch (error) {
    console.error("Error fetching watchlist:", error);
  }

  return { movies, watchlistMap };
};

export const toggleWatchlist = async (movie_id, isInWatchlist) => {
  const url = isInWatchlist ? "/movies/watchlist/remove" : "/movies/watchlist/add";
  const message = isInWatchlist ? "Remove from WatchList" : "Added to Watchlist";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to update watchlist");
    }

    return { success: true, message };
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return { success: false, message: "Failed to update watchlist" };
  }
};
