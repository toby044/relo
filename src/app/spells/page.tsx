import { client } from "@/api/client";

export default async function SpellsPage() {
  const { data: spells, error } = await client.from("spells").select("*");
  if (error) return <div>Error loading spells</div>;

  return (
    <div className="font-sans grid px-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Harry Potter Spells</h1>
      {!spells || spells.length === 0 ? (
        <p>No spells found. Please use the admin panel to fetch data.</p>
      ) : (
        <ul className="grid gap-4">
          {spells.map((spell) => (
            <li key={spell.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{spell.spell}</h3>
              {spell.use && <p className="text-gray-600 mt-2">{spell.use}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
