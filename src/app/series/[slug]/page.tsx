import { client } from "@/api/client";

export default async function SeriesDetailPage({ params }) {
  const { slug } = params;
  const { data: series, error } = await client
    .from("series")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !series) return <div>Series not found</div>;

  return (
    <div>
      <h1>{series.title}</h1>
      <p>{series.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
}