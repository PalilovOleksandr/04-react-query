import axios from 'axios';
import { type Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
export const fetchMovies = async (query: string, page: number) => {
  const response = await axios.get<MovieHttpResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
};
