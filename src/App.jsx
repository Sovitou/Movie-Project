import "./style/App.css";
import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";
import { useEffect, useState } from "react";
import { Search, Logo, NumResult } from "./components/NavBar";
import { ListBox, MovieList } from "./components/MainComponent";
import {
  WatchedMovieList,
  WatchedMovieSummary,
} from "./components/MainComponent";

const APIKEY = "929bf9e8";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const query = "Oggy";
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(function () {
    async function MovieFetch() {
      try {
        setIsLoad(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found !");
        setMovies(data.Search);
        console.log(data);
        setIsLoad(false);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoad(false);
      }
    }
    MovieFetch();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <MainComponent>
        <ListBox>
          {isLoad && <Loading />}
          {!isLoad && !isError && <MovieList movies={movies} />}
          {isError && <ErrorMessage message={isError} />}
        </ListBox>
        <ListBox>
          <WatchedMovieSummary watched={watched} />
          <WatchedMovieList watched={watched} />
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
