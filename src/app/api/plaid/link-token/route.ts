import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If Plaid is not configured, return a mock token
    if (!isPlaidConfigured || !plaidClient) {
      console.log(
        "🏦 Plaid not configured, returning mock link token for user:",
        userId
      );

      return NextResponse.json({
        link_token: "mock_link_token_for_development",
        message: "Using mock token (Plaid not configured)",
      });
    }

    const linkTokenConfig = {
      user: {
        client_user_id: userId,
      },
      client_name: "FinFit",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    };

    const createTokenResponse =
      await plaidClient.linkTokenCreate(linkTokenConfig);

    return NextResponse.json({
      link_token: createTokenResponse.data.link_token,
    });
  } catch (error) {
    console.error("Error creating link token:", error);
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}
