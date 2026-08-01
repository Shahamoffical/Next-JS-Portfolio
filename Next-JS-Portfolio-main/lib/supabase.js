import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return a safe stub during build/dev if env vars are placeholder or unconfigured
  if (!url || !key || url.includes("your_supabase") || !url.startsWith("http")) {
    return {
      from: () => ({ select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }), data: [], error: null }), insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Supabase not configured" } }) }) }), update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Supabase not configured" } }) }) }) }), delete: () => ({ eq: () => ({ data: null, error: { message: "Supabase not configured" } }) }), order: () => ({ data: [], error: null }) }),
      auth: { signInWithPassword: async () => ({ error: { message: "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local" } }), signOut: async () => ({}), getUser: async () => ({ data: { user: null } }) },
      storage: { from: () => ({ upload: async () => ({ error: { message: "Supabase not configured" } }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) },
    };
  }

  return createBrowserClient(url, key);
}

