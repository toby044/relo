import { client } from "@/api/client";

export default async function MoviesPage() {
  const { data: movies, error } = await client.from("movies").select("*");
  if (error) return <div>Error loading movies</div>;

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <a href={`/movies/${movie.slug}`}>{movie.title}</a>
        </li>
      ))}
    </ul>
  );
}