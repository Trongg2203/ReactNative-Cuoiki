import axios from "axios";

const API_KEY = "fffcf2b8d2f64352b905695694eaa416"; // Replace with your NewsAPI key
const BASE_URL = "https://newsapi.org/v2";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Fetch top headlines
export const getTopHeadlines = async (page = 1) => {
  try {
    const response = await api.get("/top-headlines", {
      params: {
        country: "us",
        page,
        pageSize: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    throw error;
  }
};

// Search news by query
export const searchNews = async (query, page = 1) => {
  try {
    if (!query || query.trim().length < 2) {
      throw new Error("Search query must be at least 2 characters long");
    }
    const response = await api.get("/everything", {
      params: {
        q: query.trim(),
        page,
        pageSize: 20,
        sortBy: "publishedAt",
        language: "en",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
};
