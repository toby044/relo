// app/api/fetch-movies/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
console.log(supabaseAdmin);
console.log({ VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY });

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

    // Insert into Supabase
    // const { error: spellsError } = await supabaseAdmin
    //   .from("spells")
    //   .insert(spells);
    // const { error: charactersError } = await supabaseAdmin
    //   .from("characters")
    //   .insert(characters);
    // const { error: booksError } = await supabaseAdmin
    //   .from("books")
    //   .insert(books);
    // const { error: housesError } = await supabaseAdmin
    //   .from("houses")
    //   .insert(houses);

    // if (spellsError || charactersError || booksError || housesError) {
    //   return NextResponse.json({ error: spellsError?.message }, { status: 500 });
    // }

    // return NextResponse.json({
    //   ok: true,
    //   inserted: Array.isArray(spells) ? spells.length : 1,
    // });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
