export interface Deal {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  purchase_price: number;
  rehab_budget: number;
  arv: number;
  ltv: number;
  ltc: number;
  status: 'active' | 'funded' | 'closed';
  created_at: string;
  borrower_id: string;
}

export interface Lender {
  id: string;
  name: string;
  email: string;
  max_loan_amount: number;
  max_ltv: number;
  created_at: string;
}

export interface Match {
  id: string;
  deal_id: string;
  lender_id: string;
  status: 'interested' | 'approved' | 'declined';
  created_at: string;
}
