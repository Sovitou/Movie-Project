import "../style/App.css";
import popcorn from "../asset/popcornlogo.svg";

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

export function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export function Logo() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="logo" onClick={handleLogoClick}>
      <img src={popcorn} role="logo" />
      <h1>Popcorn</h1>
    </div>
  );
}

export default NavBar;
