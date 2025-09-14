import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid px-4 w-full">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to the Harry Potter Database
      </h1>
      <p className="text-lg mb-8">
        Explore the magical world of Harry Potter through our comprehensive
        database.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/characters"
          className="border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Characters</h2>
          <p className="text-gray-600">
            Discover wizards, witches, and magical creatures from the Harry
            Potter universe.
          </p>
        </Link>

        <Link
          href="/spells"
          className="border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Spells</h2>
          <p className="text-gray-600">
            Learn about the magical spells and their uses.
          </p>
        </Link>

        <Link
          href="/books"
          className="border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Books</h2>
          <p className="text-gray-600">
            Browse the complete Harry Potter book series.
          </p>
        </Link>

        <Link
          href="/houses"
          className="border p-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Houses</h2>
          <p className="text-gray-600">
            Explore the four houses of Hogwarts School.
          </p>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> If you don't see any data, please use the{" "}
          <Link href="/admin" className="underline">
            admin panel
          </Link>{" "}
          to fetch the latest data from the Potter API.
        </p>
      </div>
    </div>
  );
}
