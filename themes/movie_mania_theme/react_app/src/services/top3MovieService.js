export const fetchTopMovies = async (API_URL) => {
    if (!API_URL) {
      console.error("API URL is missing");
      return [];
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch top movies");
      }
      const data = await response.json();
      return JSON.parse(data);
    } catch (error) {
      console.error("Error fetching top movies:", error);
      return [];
    }
  };
  