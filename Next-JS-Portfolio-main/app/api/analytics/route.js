import { NextResponse } from "next/server";

export async function GET(request) {
  const token = process.env.VERCEL_AUTH_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID || process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json({
      configured: false,
      message: "Vercel Auth Token or Project ID missing in environment variables.",
    });
  }

  try {
    // Query Vercel Analytics REST API
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const to = new Date().toISOString();

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fetch Stats from Vercel API
    const [statsRes, pagesRes, referrersRes] = await Promise.all([
      fetch(
        `https://api.vercel.com/v1/analytics/stats?projectId=${projectId}&from=${from}&to=${to}`,
        { headers }
      ),
      fetch(
        `https://api.vercel.com/v1/analytics/stats/pages?projectId=${projectId}&from=${from}&to=${to}`,
        { headers }
      ),
      fetch(
        `https://api.vercel.com/v1/analytics/stats/referrers?projectId=${projectId}&from=${from}&to=${to}`,
        { headers }
      ),
    ]);

    if (!statsRes.ok) {
      // Fallback response with configured true if API permission needed
      return NextResponse.json({
        configured: true,
        live: false,
        error: "Vercel API Token requires Web Analytics read scope.",
        stats: null,
      });
    }

    const statsData = await statsRes.json();
    const pagesData = await pagesRes.json().catch(() => []);
    const referrersData = await referrersRes.json().catch(() => []);

    return NextResponse.json({
      configured: true,
      live: true,
      data: {
        visitors: statsData.visitors || 0,
        pageviews: statsData.pageviews || 0,
        pages: Array.isArray(pagesData) ? pagesData : [],
        referrers: Array.isArray(referrersData) ? referrersData : [],
      },
    });
  } catch (err) {
    return NextResponse.json({
      configured: true,
      live: false,
      error: err.message,
    });
  }
}
