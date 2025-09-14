import { client } from "@/api/client";

export default async function HousesPage() {
  const { data: houses, error } = await client.from("houses").select("*");
  if (error) return <div>Error loading houses</div>;

  return (
    <div className="font-sans grid px-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Hogwarts Houses</h1>
      {!houses || houses.length === 0 ? (
        <p>No houses found. Please use the admin panel to fetch data.</p>
      ) : (
        <ul className="grid gap-4">
          {houses.map((house) => (
            <li key={house.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{house.house}</h3>
              {house.emoji && (
                <div className="text-2xl mb-2">{house.emoji}</div>
              )}
              {house.founder && (
                <p className="text-gray-600">Founder: {house.founder}</p>
              )}
              {house.colors && house.colors.length > 0 && (
                <p className="text-gray-600">
                  Colors: {house.colors.join(", ")}
                </p>
              )}
              {house.animal && (
                <p className="text-gray-600">Animal: {house.animal}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
