"use client";

import { useParams } from "next/navigation";

const series = {
  breakingbad: {
    title: "Breaking Bad",
    description: "A high school chemistry teacher turns to a life of crime.",
  },
  strangerthings: {
    title: "Stranger Things",
    description:
      "A group of kids uncover supernatural mysteries in their small town.",
  },
};

export default function SeriesDetailPage() {
  const { slug } = useParams();
  const serie = series[slug];

  if (!series) return <div>Series not found</div>;

  return (
    <div>
      <h1>{serie.title}</h1>
      <p>{serie.description}</p>
    </div>
  );
}
