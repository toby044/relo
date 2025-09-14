import { createClient } from "@supabase/supabase-js";

const client = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
);
export { client };
