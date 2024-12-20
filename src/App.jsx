import "./style/App.css";
import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";
import { useEffect, useState } from "react";
import { Search, Logo, NumResult } from "./components/NavBar";
import { ListBox, MovieList } from "./components/MainComponent";
import {
  WatchedMovieList,
  WatchedMovieSummary,
  SelectedMovie,
} from "./components/MainComponent";

const APIKEY = "929bf9e8";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedID(id);
  }

  function handleClosedMovie() {
    setSelectedID(null);
  }

  useEffect(
    function () {
      async function MovieFetch() {
        try {
          setIsLoad(true);
          setIsError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found !");
          setMovies(data.Search);
          setIsLoad(false);
        } catch (err) {
          setIsError(err.message);
        } finally {
          setIsLoad(false);
        }

        if (query.length < 3) {
          setIsError("");
        }
      }
      MovieFetch();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <MainComponent>
        <ListBox>
          {isLoad && <Loading />}
          {!isLoad && !isError && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {isError && <ErrorMessage message={isError} />}
        </ListBox>
        <ListBox>
          {selectedID ? (
            <SelectedMovie
              selectedId={selectedID}
              onClosedMovie={handleClosedMovie}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </ListBox>
      </MainComponent>
    </>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return <p className="error">❌{message}</p>;
}
