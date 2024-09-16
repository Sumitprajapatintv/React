import { useEffect, useState } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setisLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=8755c3e1&s=${query}`
        );
        // console.log("res", res);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movies not Found");
        }
        setMovies(data.Search);
        setError("");
      } catch (error) {
        console.error("error.message", error.message);
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setisLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchData();

    return function () {
      controller.abort();
    }
  }, [query]);
  return { movies, isLoading, error };
}