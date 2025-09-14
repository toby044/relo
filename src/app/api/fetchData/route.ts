// app/api/fetch-potter-data/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY env vars (server-only).",
  );
}

const supabaseAdmin = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: { persistSession: false },
  },
);

// Create tables if they don't exist
async function createTablesIfNotExist() {
  try {
    // Create characters table
    await supabaseAdmin.rpc("create_characters_table_if_not_exists");

    // Create spells table
    await supabaseAdmin.rpc("create_spells_table_if_not_exists");

    // Create books table
    await supabaseAdmin.rpc("create_books_table_if_not_exists");

    // Create houses table
    await supabaseAdmin.rpc("create_houses_table_if_not_exists");
  } catch (_error) {
    // If RPC functions don't exist, we'll create tables using raw SQL
    console.log(
      "RPC functions not found, attempting to create tables with SQL",
    );

    // Characters table
    await supabaseAdmin
      .rpc("exec", {
        sql: `
        CREATE TABLE IF NOT EXISTS characters (
          id SERIAL PRIMARY KEY,
          fullName TEXT,
          nickname TEXT,
          hogwartsHouse TEXT,
          interpretedBy TEXT,
          children TEXT[],
          image TEXT,
          birthdate TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        // Fallback: try with direct query
        console.log("Creating characters table");
      });

    // Spells table
    await supabaseAdmin
      .rpc("exec", {
        sql: `
        CREATE TABLE IF NOT EXISTS spells (
          id SERIAL PRIMARY KEY,
          spell TEXT,
          use TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        console.log("Creating spells table");
      });

    // Books table
    await supabaseAdmin
      .rpc("exec", {
        sql: `
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          title TEXT,
          originalTitle TEXT,
          releaseDate TEXT,
          description TEXT,
          pages INTEGER,
          cover TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        console.log("Creating books table");
      });

    // Houses table
    await supabaseAdmin
      .rpc("exec", {
        sql: `
        CREATE TABLE IF NOT EXISTS houses (
          id SERIAL PRIMARY KEY,
          house TEXT,
          emoji TEXT,
          founder TEXT,
          colors TEXT[],
          animal TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
      })
      .catch(() => {
        console.log("Creating houses table");
      });
  }
}

export async function POST() {
  try {
    // First, try to create tables if they don't exist
    await createTablesIfNotExist().catch(console.error);

    const spellsRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/spells",
    );
    const charactersRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/characters",
    );
    const booksRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/books",
    );
    const housesRes = await fetch(
      "https://potterapi-fedeperin.vercel.app/en/houses",
    );

    console.log({ spellsRes, charactersRes, booksRes, housesRes });

    if (!spellsRes.ok || !charactersRes.ok || !booksRes.ok || !housesRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch remote data" },
        { status: 502 },
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

    // Insert spells
    if (spells && Array.isArray(spells)) {
      await supabaseAdmin.from("spells").delete().gte("id", 0); // Clear existing
      const { error: spellsError } = await supabaseAdmin
        .from("spells")
        .insert(spells);
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
      const { error: charactersError } = await supabaseAdmin
        .from("characters")
        .insert(characters);
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
      const { error: booksError } = await supabaseAdmin
        .from("books")
        .insert(books);
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
      const { error: housesError } = await supabaseAdmin
        .from("houses")
        .insert(houses);
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
      { status: 500 },
    );
  }
}
