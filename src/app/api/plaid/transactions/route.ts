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

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth();
    console.log("🔍 Transactions API called for user:", userId);

    if (!userId) {
      console.log("❌ No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If Plaid is not configured, return mock data
    if (!isPlaidConfigured || !plaidClient) {
      console.log("🏦 Plaid not configured, returning mock transaction data");
      return NextResponse.json({
        transactions: [
          {
            transaction_id: "mock_transaction_1",
            name: "Starbucks",
            amount: 4.95,
            date: new Date().toISOString().split("T")[0],
            category: ["Food and Drink", "Coffee"],
            account_id: "mock_checking_account",
          },
          {
            transaction_id: "mock_transaction_2",
            name: "Whole Foods Market",
            amount: 127.84,
            date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
            category: ["Shops", "Groceries"],
            account_id: "mock_checking_account",
          },
          {
            transaction_id: "mock_transaction_3",
            name: "Shell Gas Station",
            amount: 52.3,
            date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
            category: ["Transportation", "Gas"],
            account_id: "mock_checking_account",
          },
          {
            transaction_id: "mock_transaction_4",
            name: "Netflix",
            amount: 15.99,
            date: new Date(Date.now() - 259200000).toISOString().split("T")[0],
            category: ["Entertainment", "Streaming"],
            account_id: "mock_checking_account",
          },
          {
            transaction_id: "mock_transaction_5",
            name: "Direct Deposit - Payroll",
            amount: -3250.0,
            date: new Date(Date.now() - 345600000).toISOString().split("T")[0],
            category: ["Deposit", "Payroll"],
            account_id: "mock_checking_account",
          },
          {
            transaction_id: "mock_transaction_6",
            name: "Amazon Prime",
            amount: 14.99,
            date: new Date(Date.now() - 432000000).toISOString().split("T")[0],
            category: ["Shops", "Online"],
            account_id: "mock_credit_account",
          },
          {
            transaction_id: "mock_transaction_7",
            name: "Uber",
            amount: 23.45,
            date: new Date(Date.now() - 518400000).toISOString().split("T")[0],
            category: ["Transportation", "Ride Share"],
            account_id: "mock_credit_account",
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

    // Fetch transactions from Plaid for the last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    console.log("📅 Date range:", {
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    });

    const transactionsRequest = {
      access_token: userData.plaid_access_token,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };

    console.log("🔍 Plaid transactions request:", transactionsRequest);

    const transactionsResponse =
      await plaidClient.transactionsGet(transactionsRequest);

    console.log(
      "✅ Transactions fetched successfully:",
      transactionsResponse.data.transactions.length
    );

    return NextResponse.json({
      transactions: transactionsResponse.data.transactions,
    });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);

    // Check if it's a Plaid API error
    if (error && typeof error === "object" && "response" in error) {
      const plaidError = error as any;
      console.error("🏦 Plaid API Error Details:", {
        status: plaidError.response?.status,
        statusText: plaidError.response?.statusText,
        data: plaidError.response?.data,
        headers: plaidError.response?.headers,
      });

      // Handle specific Plaid error types
      if (plaidError.response?.status === 400) {
        console.error("📋 400 Bad Request - Check parameters:", {
          error_type: plaidError.response?.data?.error_type,
          error_code: plaidError.response?.data?.error_code,
          error_message: plaidError.response?.data?.error_message,
          display_message: plaidError.response?.data?.display_message,
        });
      }
    }

    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch transactions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
