import { createClient } from "@/lib/supabase/server";
export async function getAlternatives() {
  const supabase = await createClient();
  const { data: alts } = await supabase
    .from("alternatives")
    .select("*")
    .order("name");
  const { data: vals } = await supabase.from("alternative_values").select("*");

  return (alts || []).map((a) => ({
    ...a,
    values: (vals || [])
      .filter((v) => v.alternative_id === a.id)
      .reduce((acc, v) => ({ ...acc, [v.criteria_id]: v.value }), {}),
  }));
}
