import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<TMDBResponse> => {
  try {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.status_message || error.message;
      throw new Error(`TMDB API error (${status}): ${message}`);
    } else if (error instanceof Error) {
      throw new Error(`Unexpected error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching movies.');
    }
  }
};

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
