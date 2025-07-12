import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOnboardingData } from "@/lib/supabase";

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

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    console.log("🔍 Accounts API called for user:", userId);

    if (!userId) {
      console.log("❌ No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If Plaid is not configured, return mock data
    if (!isPlaidConfigured || !plaidClient) {
      console.log("🏦 Plaid not configured, returning mock account data");
      return NextResponse.json({
        accounts: [
          {
            account_id: "mock_checking_account",
            name: "Chase Checking",
            type: "depository",
            subtype: "checking",
            balances: {
              available: 2847.35,
              current: 2847.35,
              iso_currency_code: "USD",
            },
          },
          {
            account_id: "mock_savings_account",
            name: "Chase Savings",
            type: "depository",
            subtype: "savings",
            balances: {
              available: 15420.75,
              current: 15420.75,
              iso_currency_code: "USD",
            },
          },
          {
            account_id: "mock_credit_account",
            name: "Chase Freedom Credit Card",
            type: "credit",
            subtype: "credit card",
            balances: {
              available: 4762.5,
              current: -1237.5,
              iso_currency_code: "USD",
            },
          },
        ],
      });
    }

    // Get user's onboarding data to retrieve access token
    const userData = await getOnboardingData(userId);
    console.log("👤 User data:", userData ? "Found" : "Not found");
    console.log(
      "🔑 Access token:",
      userData?.plaid_access_token ? "Present" : "Missing"
    );

    if (!userData || !userData.plaid_access_token) {
      console.log("❌ No access token found for user");
      return NextResponse.json(
        { error: "Bank not connected" },
        { status: 400 }
      );
    }

    // Fetch accounts from Plaid
    console.log("🏦 Fetching accounts from Plaid...");
    const accountsResponse = await plaidClient.accountsGet({
      access_token: userData.plaid_access_token,
    });

    console.log(
      "✅ Accounts fetched successfully:",
      accountsResponse.data.accounts.length
    );
    return NextResponse.json({
      accounts: accountsResponse.data.accounts,
    });
  } catch (error) {
    console.error("❌ Error fetching accounts:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Failed to fetch accounts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
