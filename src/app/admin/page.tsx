import FetchDataButton from "@/app/admin/FetchDataButton";

export default function AdminPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin — Harry Potter Data</h1>
      <p className="mb-4">
        Fetch the latest Harry Potter data from the API and update the database.
        This will fetch characters, spells, books, and houses data.
      </p>
      <FetchDataButton />
    </main>
  );
}
