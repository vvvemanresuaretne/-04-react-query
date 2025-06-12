import React from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

type Props = {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
};

const MovieGrid: React.FC<Props> = ({ movies, onSelect }) => {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
