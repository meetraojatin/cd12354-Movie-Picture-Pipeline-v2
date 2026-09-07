import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIE_API_URL || 'http://aa89a76e643134c718b9c813117fe8bc-689587916.us-east-1.elb.amazonaws.com';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movie && movie.id) {
      setLoading(true);
      setError(null);
      axios.get(`${API_BASE_URL}/movies/${movie.id}`)
        .then((response) => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching movie details:', err);
          setError('Failed to load movie details.');
          setLoading(false);
        });
    }
  }, [movie]);

  if (!movie) {
    return (
      <div style={styles.placeholder}>
        <p>Select a movie from the list to view its details.</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      {loading ? (
        <p style={styles.loading}>Loading movie details...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <>
          <h2 style={styles.title}>{details?.title || movie?.title}</h2>
          {details?.year && <p style={styles.meta}><strong>Release Year:</strong> {details.year}</p>}
          {details?.genre && <p style={styles.meta}><strong>Genre:</strong> {details.genre}</p>}
          {details?.director && <p style={styles.meta}><strong>Director:</strong> {details.director}</p>}
          <div style={styles.divider}></div>
          <p style={styles.description}>
            {details?.description || 'No description available for this movie.'}
          </p>
        </>
      )}
    </div>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }),
};

const styles = {
  card: {
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e1e4e8',
    marginTop: '16px',
  },
  placeholder: {
    padding: '32px',
    textAlign: 'center',
    color: '#6a737d',
    backgroundColor: '#f6f8fa',
    borderRadius: '8px',
    border: '1px dashed #d1d5da',
  },
  title: {
    margin: '0 0 12px 0',
    color: '#1a1f36',
    fontSize: '1.6rem',
  },
  meta: {
    margin: '4px 0',
    color: '#4a5568',
    fontSize: '0.95rem',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e1e4e8',
    margin: '16px 0',
  },
  description: {
    lineHeight: '1.6',
    color: '#24292e',
    fontSize: '1rem',
  },
  loading: {
    color: '#0366d6',
  },
  error: {
    color: '#d73a49',
  },
};

export default MovieDetail;