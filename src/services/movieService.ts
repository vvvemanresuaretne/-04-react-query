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
    api_key: import.meta.env.VITE_TMDB_API_KEY,
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



