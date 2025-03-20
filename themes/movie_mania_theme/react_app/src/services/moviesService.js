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