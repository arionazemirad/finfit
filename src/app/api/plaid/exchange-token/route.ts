import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { upsertOnboardingData } from "@/lib/supabase";

// Check if Plaid is configured
const isPlaidConfigured =
  process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET;

// Only import and create Plaid client if configured
let plaidClient: any = null;

if (isPlaidConfigured) {
  const { PlaidApi, Configuration, PlaidEnvironments } = require("plaid");

  plaidClient = new PlaidApi(
    new Configuration({
      basePath:
        process.env.PLAID_ENV === "production"
          ? PlaidEnvironments.production
          : PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
          "PLAID-SECRET": process.env.PLAID_SECRET!,
        },
      },
    })
  );
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    console.log("🔍 Exchange token API called for user:", userId);

    if (!userId) {
      console.log("❌ No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { public_token } = await request.json();
    console.log(
      "🔑 Public token received:",
      public_token ? "Present" : "Missing"
    );

    if (!public_token) {
      console.log("❌ No public token provided");
      return NextResponse.json(
        { error: "Public token is required" },
        { status: 400 }
      );
    }

    // If Plaid is not configured, simulate success
    if (!isPlaidConfigured || !plaidClient) {
      console.log(
        "🏦 Plaid not configured, simulating bank connection for user:",
        userId
      );

      // Update onboarding data to mark Plaid as connected
      await upsertOnboardingData({
        user_id: userId,
        plaid_connected: true,
      });

      return NextResponse.json({
        success: true,
        item_id: "mock_item_id",
        message: "Bank connection simulated (Plaid not configured)",
      });
    }

    // Exchange public token for access token
    console.log("🔄 Exchanging public token for access token...");
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const { access_token, item_id } = exchangeResponse.data;
    console.log("✅ Token exchange successful, access token received");
    console.log("🏦 Item ID:", item_id);

    // Update onboarding data to mark Plaid as connected and store access token
    console.log("💾 Storing access token in database...");
    const updateResult = await upsertOnboardingData({
      user_id: userId,
      plaid_connected: true,
      plaid_access_token: access_token,
      plaid_item_id: item_id,
    });

    console.log("✅ Database update result:", updateResult);
    console.log("✅ Plaid connection successful for user:", userId);
    return NextResponse.json({
      success: true,
      item_id: item_id,
    });
  } catch (error) {
    console.error("❌ Error exchanging token:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to exchange token",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
