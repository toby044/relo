import FetchDataButton from "@/app/admin/FetchDataButton";

export default function AdminPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin — Data</h1>
      <p className="mb-4">Fetch remote data and insert into the DB.</p>
      <FetchDataButton />
    </main>
  );
}