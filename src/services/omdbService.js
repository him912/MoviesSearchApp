const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "46b07bc3";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1, type = "") => {
  const url = new URL(BASE_URL);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("s", query);
  url.searchParams.append("page", page.toString());
  if (type) {
    url.searchParams.append("type", type);
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("i", id);
  url.searchParams.append("plot", "full");

  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};
