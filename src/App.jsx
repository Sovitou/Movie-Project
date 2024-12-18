import "./style/App.css";
import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";
import { useState } from "react";
import tempMovieData from "./constant/tempMovieData.js";
import tempWatchedData from "./constant/tempWatchedData.js";
import { Search, Logo, NumResult } from "./components/NavBar";
import {
  ListBox,
  WatchedMovieBox,
  MovieList,
} from "./components/MainComponent";
import {
  WatchedMovieList,
  WatchedMovieSummary,
} from "./components/MainComponent";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <MainComponent>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedMovieSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </ListBox>
      </MainComponent>
    </>
  );
}
