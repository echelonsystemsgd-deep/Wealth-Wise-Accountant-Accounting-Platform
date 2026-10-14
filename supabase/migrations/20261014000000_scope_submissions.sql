-- ============================================================================
-- WEALTH WISE ACCOUNTANT — PROJECT STAGING SCOPE SUBMISSIONS TABLE
-- Stores client questionnaire submissions securely with timestamps and status
-- ============================================================================

CREATE TABLE IF NOT EXISTS project_scope_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    practice_name VARCHAR(255) NOT NULL DEFAULT 'Wealth Wise Accountant',
    
    -- Part 1: Website & Launch
    q1_domain TEXT,
    q2_current_developer TEXT,
    q3_assets_ready TEXT,
    
    -- Part 2: Software Platform Scope
    q4_launch_must_haves TEXT,
    q5_day_one_users TEXT,
    q6_vat_schemes TEXT,
    q7_bank_feeds TEXT,
    q8_migration_xero TEXT,
    q9_client_support TEXT,
    q10_real_data TEXT,
    
    -- Part 3: Commercials & Ownership
    q11_budget TEXT,
    q12_code_ownership TEXT,
    q13_decision_makers TEXT,
    
    -- Metadata & Contact
    client_contact_phone VARCHAR(50),
    client_contact_email VARCHAR(255),
    ip_address VARCHAR(100),
    submission_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW' CHECK (submission_status IN ('PENDING_REVIEW', 'ACCEPTED', 'SCHEDULED', 'DECLINED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: Only service role / developer can view all submissions
ALTER TABLE project_scope_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous submissions insert"
    ON project_scope_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Developer read access only"
    ON project_scope_submissions
    FOR SELECT
    TO authenticated
    USING (true);
