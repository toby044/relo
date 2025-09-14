"use client";
import { createClient } from "@supabase/supabase-js";

const _viteUrl = process.env.VITE_SUPABASE_URL;
const _supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
);

export default function SupaProvider() {
  //   const [instruments, setInstruments] = useState([]);

  //   useEffect(() => {
  //     getInstruments();
  //   }, []);

  //   async function getInstruments() {
  //     const { data } = await supabase.from("instruments").select();
  //     setInstruments(data);
  //   }

  return (
    <div className="font-sans grid  px-4 w-full">
      {/* <div>
        {instruments.map((instrument) => (
          <div key={instrument.id}>{instrument.name}</div>
        ))}
      </div> */}
    </div>
  );
}
