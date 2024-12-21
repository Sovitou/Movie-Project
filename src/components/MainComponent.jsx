import "../style/App.css";
import { useState, useEffect } from "react";

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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export function WatchedMovieList({ watched, onDelectWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDelectWatchedMovie={onDelectWatchedMovie}
        />
      ))}
    </ul>
  );
}

export function WatchedMovie({ movie, onDelectWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDelectWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export function SelectedMovie({
  selectedId,
  onClosedMovie,
  onAddWatchedMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

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

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: 0,
    };
    onAddWatchedMovie(newMovie);
  }

  useEffect(
    function () {
      setIsLoad(true);
      async function DetailMovieFetch() {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
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
        <button className="btn-add" onClick={handleAdd}>
          + Add movie to watched list
        </button>

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
