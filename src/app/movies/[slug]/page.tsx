import { client } from "@/api/client";

export default async function MovieDetailPage({ params }) {
  const { slug } = params;
  const { data: movie, error } = await client
    .from("movies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !movie) return <div>Movie not found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
}