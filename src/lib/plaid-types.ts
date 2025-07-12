// Plaid Account Types
export interface PlaidAccount {
  account_id: string;
  name: string;
  type: string;
  subtype: string;
  balances: {
    available: number | null;
    current: number | null;
    iso_currency_code: string | null;
    limit: number | null;
    unofficial_currency_code: string | null;
  };
  mask?: string;
  official_name?: string;
  verification_status?: string;
}

// Plaid Transaction Types
export interface PlaidTransaction {
  transaction_id: string;
  name: string;
  amount: number;
  date: string;
  category?: string[];
  category_id?: string;
  account_id: string;
  account_owner?: string;
  authorized_date?: string;
  authorized_datetime?: string;
  datetime?: string;
  iso_currency_code?: string;
  merchant_name?: string;
  payment_channel?: string;
  payment_meta?: {
    by_order_of?: string;
    payee?: string;
    payer?: string;
    payment_method?: string;
    payment_processor?: string;
    ppd_id?: string;
    reason?: string;
    reference_number?: string;
  };
  pending?: boolean;
  pending_transaction_id?: string;
  personal_finance_category?: {
    confidence_level?: string;
    detailed?: string;
    primary?: string;
  };
  transaction_code?: string;
  transaction_type?: string;
  unofficial_currency_code?: string;
}

// Dashboard Data Types (transformed from Plaid data)
export interface DashboardData {
  accounts: PlaidAccount[];
  transactions: PlaidTransaction[];
  balance: {
    totalBalance: number;
    accountCount: number;
    income: number;
    expenses: number;
    savings: number;
  };
  isLoading: boolean;
  error: string | null;
}

// Error Types
export interface PlaidError {
  error_type: string;
  error_code: string;
  error_message: string;
  display_message?: string;
}
