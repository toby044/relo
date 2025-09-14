// app/api/fetch-potter-data/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY env vars (server-only)."
  );
}

const supabaseAdmin = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: { persistSession: false },
  }
);

export async function POST() {
  try {
    const spellsRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/spells"
    );
    const charactersRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/characters"
    );
    const booksRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/books"
    );
    const housesRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/houses"
    );

    console.log({ spellsRes, charactersRes, booksRes, housesRes });

    if (!spellsRes.ok || !charactersRes.ok || !booksRes.ok || !housesRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch remote data" },
        { status: 502 }
      );
    }

    const spells = await spellsRes.json();
    const characters = await charactersRes.json();
    const books = await booksRes.json();
    const houses = await housesRes.json();

    console.log({
      spellsCount: spells?.length,
      charactersCount: characters?.length,
      booksCount: books?.length,
      housesCount: houses?.length,
    });

    // Clear existing data and insert new data
    let insertedCount = 0;

    // Helper to recursively lowercase all keys in an object/array
    function toLowercaseKeys(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map(toLowercaseKeys);
      } else if (obj && typeof obj === 'object' && obj.constructor === Object) {
        const newObj: any = {};
        Object.keys(obj).forEach((k) => {
          newObj[k.toLowerCase()] = toLowercaseKeys(obj[k]);
        });
        return newObj;
      }
      return obj;
    }

    // Insert spells
    if (spells && Array.isArray(spells)) {
      await supabaseAdmin.from("spells").delete().gte("id", 0); // Clear existing
      const spellsLower = toLowercaseKeys(spells);
      const { error: spellsError } = await supabaseAdmin
        .from("spells")
        .insert(spellsLower);
      if (spellsError) {
        console.error("Spells insert error:", spellsError);
        return NextResponse.json(
          { error: spellsError.message },
          { status: 500 },
        );
      }
      insertedCount += spells.length;
    }

    // Insert characters
    if (characters && Array.isArray(characters)) {
      await supabaseAdmin.from("characters").delete().gte("id", 0); // Clear existing
      const charactersLower = toLowercaseKeys(characters);
      const { error: charactersError } = await supabaseAdmin
        .from("characters")
        .insert(charactersLower);
      if (charactersError) {
        console.error("Characters insert error:", charactersError);
        return NextResponse.json(
          { error: charactersError.message },
          { status: 500 },
        );
      }
      insertedCount += characters.length;
    }

    // Insert books
    if (books && Array.isArray(books)) {
      await supabaseAdmin.from("books").delete().gte("id", 0); // Clear existing
      const booksLower = toLowercaseKeys(books);
      const { error: booksError } = await supabaseAdmin
        .from("books")
        .insert(booksLower);
      if (booksError) {
        console.error("Books insert error:", booksError);
        return NextResponse.json(
          { error: booksError.message },
          { status: 500 },
        );
      }
      insertedCount += books.length;
    }

    // Insert houses
    if (houses && Array.isArray(houses)) {
      await supabaseAdmin.from("houses").delete().gte("id", 0); // Clear existing
      const housesLower = toLowercaseKeys(houses);
      const { error: housesError } = await supabaseAdmin
        .from("houses")
        .insert(housesLower);
      if (housesError) {
        console.error("Houses insert error:", housesError);
        return NextResponse.json(
          { error: housesError.message },
          { status: 500 },
        );
      }
      insertedCount += houses.length;
    }

    return NextResponse.json({
      ok: true,
      inserted: insertedCount,
      details: {
        spells: spells?.length || 0,
        characters: characters?.length || 0,
        books: books?.length || 0,
        houses: houses?.length || 0,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Fetch data error:", error);
    return NextResponse.json(
      { error: error?.message ?? String(error) },
      { status: 500 }
    );
  }
}
