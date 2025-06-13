import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`, 
    },
  });

  return response.data.results;
};

type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
