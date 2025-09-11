'use client'

import { useParams } from 'next/navigation'

const movies = {
  inception: { title: "Inception", description: "A mind-bending thriller." },
  interstellar: {
    title: "Interstellar",
    description: "A journey through space and time.",
  },
};

export default function MovieDetailPage() {
  const { slug: } = useParams();
  const movie = movies[slug];

  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}
