import { client } from "@/api/client";

export default async function CharactersPage() {
  const { data: characters, error } = await client
    .from("characters")
    .select("*");
  if (error) return <div>Error loading characters</div>;

  return (
    <div className="font-sans grid px-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Harry Potter Characters</h1>
      {!characters || characters.length === 0 ? (
        <p>No characters found. Please use the admin panel to fetch data.</p>
      ) : (
        <ul className="grid gap-4">
          {characters.map((character) => (
            <li key={character.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{character.fullName}</h3>
              {character.nickname && (
                <p className="text-gray-600">Nickname: {character.nickname}</p>
              )}
              {character.hogwartsHouse && (
                <p className="text-gray-600">
                  House: {character.hogwartsHouse}
                </p>
              )}
              {character.birthdate && (
                <p className="text-gray-600">Born: {character.birthdate}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
