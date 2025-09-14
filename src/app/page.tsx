import { client } from "@/api/client";

export default async function Home() {
  const { data: movies, error: moviesError } = await client
    .from("movies")
    .select("*");
  const { data: series, error: seriesError } = await client
    .from("series")
    .select("*");

  if (moviesError || seriesError) return <div>Error loading data</div>;

  return (
    <div className="font-sans grid  px-4 w-full">
      <h1 className="text-2xl font-bold">Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={`/movies/${movie.slug}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold">Series</h1>
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            <a href={`/series/${serie.slug}`}>{serie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
