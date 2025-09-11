import Link from "next/link";

const series = [
  { title: "Breaking Bad", slug: "breaking-bad" },
  { title: "Stranger Things", slug: "stranger-things" },
];

export default function SeriesPage() {
  return (
    <div>
      <h1>Series</h1>
      <ul>
        {series.map((serie) => (
          <li key={serie.slug}>
            <Link href={`/series/${serie.slug}`}>{serie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
