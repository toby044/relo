import { client } from "@/api/client";
import CharactersList from "@/app/components/Characters/CharactersList";

export default async function CharactersPage() {
  const { data: characters, error } = await client
    .from("characters")
    .select("*");
  if (error) return <div>Error loading characters</div>;

  return (
    <div className="font-sans grid w-full">
      <h1 className="text-2xl font-bold mb-4 px-8">Harry Potter Characters</h1>

      <CharactersList characters={characters} />
    </div>
  );
}
