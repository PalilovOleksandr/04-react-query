import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { type Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["movie", query, currentPage],
        queryFn: () => fetchMovies(query, currentPage),
        enabled: query !== "",
        placeholderData: keepPreviousData,
    });
    useEffect(() => {
        if (data?.results.length === 0 && isSuccess) {
            toast.error("No movies found for your request.");
        }
    }, [data, isSuccess]);
    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setCurrentPage(1);
    };
    const totalPages = data?.total_pages ?? 0;
    const selectCard = (movie: Movie | null): void => {
        setSelectedMovie(movie);
    }
    const handleSelectedMovie = () => {
        setSelectedMovie(null);
    }
    return (
        <div className={css.app}>
            <Toaster />
            <SearchBar onSubmit={handleSearch} />
            {isPending && query !== "" && <Loader />}
            {isSuccess && totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                    forcePage={currentPage - 1}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    nextLabel="→"
                    previousLabel="←" />
            )}
            {isError && <ErrorMessage />}
            {data && data.results.length > 0 && < MovieGrid onSelect={selectCard} movies={data.results} />}
            {selectedMovie && <MovieModal onClose={handleSelectedMovie} movie={selectedMovie} />}
        </div>
    )
}