import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container" style={styles.appContainer}>
      <div style={styles.sidebar}>
        <h2>Movie List</h2>
        <MovieList onMovieClick={handleMovieClick} />
      </div>

      <div style={styles.mainContent}>
        <h2>Movie Details</h2>
        <MovieDetails movie={selectedMovie} />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    gap: '32px',
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    flex: '1',
    minWidth: '250px',
  },
  mainContent: {
    flex: '2',
  },
};
