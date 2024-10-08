import { useEffect, useRef, useState } from "react";
import "./App.css";
import StartComponenet from './startComponent';
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStroge";
import { useKey } from "./useKey";

let KEY = "8755c3e1";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched")

  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState("");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function onCloseMovi() {
    setSelectedId(null);
  }
  function handleSetWatched(newWatchedMovi) {
    setWatched((watched) => [newWatchedMovi, ...watched]);
  }

  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movi) => movi.imdbID !== id))
  }

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} onHandleMovi={handleSelectedId} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? <MoviDetails selectedId={selectedId} onCloseMovi={onCloseMovi} onWatched={handleSetWatched} watched={watched} /> : <Summmary
            watched={watched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
            onDeleteWatched={handleWatchedDelete}
          />}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading..</p>;
}

function ErrorMessage({ message }) {
  // console.log("me", message);
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  const inpEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inpEl.current)
      return true;
    inpEl.current.focus();
    setQuery("");
  })

  // useEffect(function () {

  //   function callback(e) {
  //     if (document.activeElement === inpEl.current)
  //       return true;
  //     console.log(e);
  //     if (e.code === "Enter") {
  //       inpEl.current.focus();
  //       setQuery("");
  //     }
  //   }
  //   document.addEventListener("keydown", callback)

  //   return () => document.addEventListener("keydown", callback)
  //   // console.log(inpEl.current);
  //   // inpEl.current.focus();
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inpEl}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ movies, children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  // console.log("Simor");
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

function MoviesList({ movies, onHandleMovi }) {
  // console.log("Movies", movies);
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movi movie={movie} onHandleMovi={onHandleMovi} />
      ))}
    </ul>
  );
}

function Movi({ movie, onHandleMovi }) {
  return (
    <li key={movie.imdbID} onClick={() => onHandleMovi(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summmary({ watched, avgImdbRating, avgUserRating, avgRuntime, onDeleteWatched }) {
  // console.log("watched", watched);
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <WatchedMoviHeader
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />
      </div>

      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
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
              <button
                className="btn-delete"
                onClick={() => onDeleteWatched(movie.imdbID)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function WatchedMoviHeader({
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
}) {
  return (
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
  );
}

function MoviDetails({ selectedId, onCloseMovi, onWatched, watched }) {
  const [isLoading, setisLoading] = useState(false);
  const [movie, setMovi] = useState({});
  const [userRating, setUserRating] = useState("");
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  let countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) {
        console.log(countRef.current)
        countRef.current++;
      }
    },
    [userRating]
  )

  function onHandleAdd() {
    const newWachedMovi = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      userDesionRating: countRef.current
    }
    console.log(newWachedMovi)
    onWatched(newWachedMovi);
    onCloseMovi();
  }
  console.log(movie)
  // console.log("Movi", movie.Title)

  useKey('Escape'.onCloseMovi);

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movi | ${movie.Title}`

      return function () {
        document.title = "usePopcorn";
      }
    }, [movie.Title]
  )

  useEffect(
    function () {
      async function getMovieDetails() {
        setisLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovi(data);
        setisLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovi}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? <>  <StartComponenet length={10} size="24px" onSetRating={setUserRating} />
                {userRating > 0 && <button className="btn-add" onClick={onHandleAdd}>+ Add to list</button>}</> : <><p>
                  You rated this movi {userRating}</p></>}


            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
