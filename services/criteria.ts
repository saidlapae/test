import { createClient } from "@/lib/supabase/server";
export async function getCriteria() {
  const supabase = await createClient();
  const { data } = await supabase.from("criteria").select("*").order("id");
  return data || [];
}
