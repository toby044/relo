import Link from 'next/link';

const movies = [
  { title: 'Inception', slug: 'inception' },
  { title: 'Interstellar', slug: 'interstellar' },
];

export default function MoviesPage() {
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.slug}>
            <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}