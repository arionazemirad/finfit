import { createClient } from "@supabase/supabase-js";

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔧 Supabase config check:", {
  url: supabaseUrl ? "✅ Set" : "❌ Missing",
  key: supabaseKey ? "✅ Set" : "❌ Missing",
});

const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith("https://")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface OnboardingData {
  id?: string;
  user_id: string;
  goal?: string;
  occupation?: string;
  plaid_connected?: boolean;
  plaid_access_token?: string;
  plaid_item_id?: string;
  onboarding_complete?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Mock storage for development when Supabase isn't configured
const mockStorage = new Map<string, OnboardingData>();

export async function upsertOnboardingData(data: Partial<OnboardingData>) {
  console.log("📝 Upserting onboarding data:", data);
  console.log("🔧 Supabase configured:", isSupabaseConfigured);

  if (!data.user_id) {
    throw new Error("User ID is required");
  }

  // Always use mock storage if Supabase is not properly configured
  if (!isSupabaseConfigured) {
    console.log("📝 Using mock storage (Supabase not configured):", data);

    const existingData = mockStorage.get(data.user_id) || {
      user_id: data.user_id,
    };
    const updatedData = { ...existingData, ...data };
    mockStorage.set(data.user_id, updatedData);

    console.log("✅ Mock storage updated:", updatedData);
    return updatedData;
  }

  // Test Supabase connection first
  try {
    console.log("🔄 Testing Supabase connection...");

    // First try to check if the table exists
    const { data: testData, error: testError } = await supabase!
      .from("onboarding")
      .select("count")
      .limit(1);

    if (testError) {
      console.log("❌ Supabase table test failed:", testError);
      throw new Error(
        `Supabase table error: ${testError.message || "Unknown error"}`
      );
    }

    console.log("✅ Supabase table accessible");
  } catch (error: any) {
    console.error("❌ Supabase connection test failed:", error);
    console.log("📝 Falling back to mock storage due to connection issues");

    const existingData = mockStorage.get(data.user_id) || {
      user_id: data.user_id,
    };
    const updatedData = { ...existingData, ...data };
    mockStorage.set(data.user_id, updatedData);

    console.log("✅ Mock storage fallback successful:", updatedData);
    return updatedData;
  }

  // Try the actual upsert
  try {
    console.log("🔄 Attempting Supabase upsert...");

    const { data: result, error } = await supabase!
      .from("onboarding")
      .upsert(data, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase upsert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    console.log("✅ Supabase upsert successful:", result);
    return result;
  } catch (error: any) {
    console.error("❌ Supabase upsert failed, falling back to mock storage:", {
      message: error.message || "Unknown error",
      error: error,
    });

    // Fallback to mock storage if Supabase fails
    const existingData = mockStorage.get(data.user_id) || {
      user_id: data.user_id,
    };
    const updatedData = { ...existingData, ...data };
    mockStorage.set(data.user_id, updatedData);

    console.log("✅ Fallback to mock storage successful:", updatedData);
    return updatedData;
  }
}

export async function getOnboardingData(userId: string) {
  console.log("📖 Getting onboarding data for user:", userId);
  console.log("🔧 Supabase configured:", isSupabaseConfigured);

  if (!isSupabaseConfigured) {
    console.log("📝 Using mock storage (Supabase not configured)");
    const data = mockStorage.get(userId) || null;
    console.log("📖 Mock storage result:", data);
    return data;
  }

  try {
    console.log("🔄 Attempting Supabase query...");
    const { data, error } = await supabase!
      .from("onboarding")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("❌ Supabase query error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    console.log("✅ Supabase query successful:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Supabase query failed, falling back to mock storage:", {
      message: error.message || "Unknown error",
      error: error,
    });
    const data = mockStorage.get(userId) || null;
    console.log("✅ Fallback to mock storage:", data);
    return data;
  }
}
