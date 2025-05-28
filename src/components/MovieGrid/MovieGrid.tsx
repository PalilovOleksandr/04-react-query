import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import { MdOutlineNoPhotography } from "react-icons/md";
interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <div className={css.card} onClick={() => onSelect(movie)}>
                        {movie.poster_path === movie.backdrop_path ? <MdOutlineNoPhotography className={css.image} />
                            : <img
                                className={css.image}
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.title}
                                loading="lazy"
                            />}
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
        </ul>
    )
}