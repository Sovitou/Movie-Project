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
import { useMovie } from "./hook/useMovie";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const { movies, isLoad, isError } = useMovie(query);

  const [watched, setWatched] = useState(function () {
    const storeMovie = localStorage.getItem("watched");
    return storeMovie ? JSON.parse(storeMovie) : [];
  });

  function handleSelectedMovie(id) {
    setSelectedID(id);
  }

  function handleClosedMovie() {
    setSelectedID(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function Loading() {
    return <p className="loader">Loading...</p>;
  }

  function ErrorMessage({ message }) {
    return <p className="error">❌{message}</p>;
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
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
              onAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelectWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </ListBox>
      </MainComponent>
    </>
  );
}
