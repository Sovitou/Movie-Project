import "../style/App.css";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const MainComponent = ({ children }) => {
  return <main className="main">{children}</main>;
};

export function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

export function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🎞️</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

export function SelectedMovie({ selectedId, onClosedMovie }) {
  const APIKEY = "929bf9e8";
  const [movie, setMovie] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      setIsLoad(true);
      async function DetailMovieFetch() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoad(false);
      }
      DetailMovieFetch();
    },
    [selectedId]
  );
  return isLoad ? (
    <Loading />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClosedMovie}>
          {"<"}
        </button>
        <img src={poster} alt={`Poster of ${title}'s movie `} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            <span>📅</span>
            {released} <span>⌛</span> {runtime}
          </p>
          <p>{genre}</p>
          <p>
            {" "}
            <span>⭐️</span>
            {imdbRating} {"  imdbRating"}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>
          {"Actor: "}
          {actors}
        </p>
        <p>
          {"Director: "}
          {director}
        </p>
      </section>
    </div>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}
export default MainComponent;
