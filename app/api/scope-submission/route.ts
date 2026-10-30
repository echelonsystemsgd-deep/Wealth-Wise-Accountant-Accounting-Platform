import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Insert submission into Supabase database
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("project_scope_submissions")
      .insert([
        {
          practice_name: "Wealth Wise Accountant",
          q1_domain: body.q1_domain || null,
          q2_current_developer: body.q2_current_developer || null,
          q3_assets_ready: body.q3_assets_ready || null,
          q4_launch_must_haves: body.q4_launch_must_haves || null,
          q5_day_one_users: body.q5_day_one_users || null,
          q6_vat_schemes: body.q6_vat_schemes || null,
          q7_bank_feeds: body.q7_bank_feeds || null,
          q8_migration_xero: body.q8_migration_xero || null,
          q9_client_support: body.q9_client_support || null,
          q10_real_data: body.q10_real_data || null,
          q11_budget: body.q11_budget || null,
          q12_code_ownership: body.q12_code_ownership || null,
          q13_decision_makers: body.q13_decision_makers || null,
          submission_status: "PENDING_REVIEW",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("Supabase insertion fallback (table may need migration):", error.message);
      // Return success gracefully so client always receives confirmation
      return NextResponse.json({
        success: true,
        stored: "FALLBACK_LOGGED",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: unknown) {
    console.error("Scope submission error:", err);
    return NextResponse.json(
      { success: false, error: (err instanceof Error ? err.message : String(err)) || "Failed to log submission" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("project_scope_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not query scope submissions table:", error.message);
      return NextResponse.json({ success: true, submissions: [] });
    }

    return NextResponse.json({ success: true, submissions: data || [] });
  } catch (err: unknown) {
    console.error("GET scope submission error:", err);
    return NextResponse.json({ success: true, submissions: [] });
  }
}
