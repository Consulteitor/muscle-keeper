import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Creat de forma diferida: la landing i el quiz han de funcionar encara que
 * Supabase no estigui configurat, i només calen les credencials en el moment
 * d'enviar el lead.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Falten NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Configura-les a .env.local o a les env vars de Vercel.",
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
