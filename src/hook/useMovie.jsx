import { useState, useEffect } from "react";
import { configDotenv } from "dotenv";

configDotenv();
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(
    function () {
      if (query.length < 3) {
        setMovies([]);
        setIsError("");
        setIsLoad(false);
        return;
      }

      async function MovieFetch() {
        try {
          setIsLoad(true);
          setIsError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(data.Error || "Movie not found!");
          }

          setMovies(data.Search || []);
        } catch (err) {
          setIsError(err.message);
        } finally {
          setIsLoad(false);
        }
      }

      MovieFetch();
    },
    [query, apiKey]
  );
  return { movies, isLoad, isError };
}
