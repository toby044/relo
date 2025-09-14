import { client } from "@/api/client";

export default async function SeriesPage() {
  const { data: series, error } = await client.from("series").select("*");
  if (error) return <div>Error loading series</div>;

  return (
    <ul>
      {series.map(serie => (
        <li key={serie.id}>
          <a href={`/series/${serie.slug}`}>{serie.title}</a>
        </li>
      ))}
    </ul>
  );
}