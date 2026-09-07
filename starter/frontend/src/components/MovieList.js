import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://aa89a76e643134c718b9c813117fe8bc-689587916.us-east-1.elb.amazonaws.com';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies`)
      .then((response) => {
        const movieList = Array.isArray(response.data) 
          ? response.data 
          : response.data.movies || [];
        setMovies(movieList);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie list:', err);
        setError('Failed to fetch movies from the pipeline service.');
        setLoading(false);
      });
  }, []);

  const handleSelect = (movie) => {
    setSelectedId(movie.id);
    onMovieClick(movie);
  };

  if (loading) return <p style={styles.status}>Loading movies...</p>;
  if (error) return <p style={{ ...styles.status, color: '#d73a49' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Movie Collection</h3>
      <ul style={styles.list}>
        {movies.map((movie) => {
          const isSelected = movie.id === selectedId;
          return (
            <li
              key={movie.id}
              onClick={() => handleSelect(movie)}
              style={{
                ...styles.item,
                backgroundColor: isSelected ? '#eef5ff' : '#ffffff',
                borderColor: isSelected ? '#0366d6' : '#e1e4e8',
                fontWeight: isSelected ? '600' : '400',
              }}
            >
              <span>{movie.title}</span>
              <span style={styles.arrow}>→</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

const styles = {
  container: {
    margin: '16px 0',
  },
  header: {
    marginBottom: '12px',
    color: '#24292e',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '8px',
    border: '1px solid #e1e4e8',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#1a1f36',
  },
  arrow: {
    color: '#6a737d',
  },
  status: {
    padding: '16px',
    textAlign: 'center',
    color: '#586069',
  },
};

export default MovieList;