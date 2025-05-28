import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { type Movie } from "../../types/movie";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setIsError(false);
        setMovies([]);
        try {
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error("No movies found for your request.");
                return;
            }
            setMovies(data);
        } catch (error) {
            console.error(error)
            setIsError(true);
        } finally {
            setIsLoading(false);
        }

    };
    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            <Toaster />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && <MovieGrid onSelect={setSelectedMovie} movies={movies} />}
            {selectedMovie && <MovieModal onClose={() => setSelectedMovie(null)} movie={selectedMovie} />}
        </div>
    )
}