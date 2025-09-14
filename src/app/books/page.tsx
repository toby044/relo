import { client } from "@/api/client";

export default async function BooksPage() {
  const { data: books, error } = await client.from("books").select("*");
  if (error) return <div>Error loading books</div>;

  return (
    <div className="font-sans grid px-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Harry Potter Books</h1>
      {!books || books.length === 0 ? (
        <p>No books found. Please use the admin panel to fetch data.</p>
      ) : (
        <ul className="grid gap-4">
          {books.map((book) => (
            <li key={book.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              {book.originalTitle && book.originalTitle !== book.title && (
                <p className="text-gray-600">
                  Original Title: {book.originalTitle}
                </p>
              )}
              {book.releaseDate && (
                <p className="text-gray-600">Released: {book.releaseDate}</p>
              )}
              {book.description && (
                <p className="text-gray-700 mt-2">{book.description}</p>
              )}
              {book.pages && (
                <p className="text-gray-600 mt-2">Pages: {book.pages}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
