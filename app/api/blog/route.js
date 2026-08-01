import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

function formatBlogPayload(body) {
  const {
    id,
    title,
    slug,
    category,
    author,
    views,
    status,
    content,
    tags,
    excerpt,
    faqs,
    noindex,
    seo_title,
    seoTitle,
    seo_desc,
    seoDesc,
    focus_keyword,
    focusKeyword,
    canonical_url,
    canonicalUrl,
    featured_image,
    featuredImage
  } = body;

  const payload = {
    title: title || "Untitled Blog Post",
    slug: slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : "new-post"),
    category: category || "Shopify Development",
    author: author || "Admin",
    views: views || "0",
    status: status || "Draft",
    content: content || "",
    tags: tags || "",
    excerpt: excerpt || "",
    faqs: faqs || "",
    noindex: !!noindex,
    seo_title: seo_title || seoTitle || "",
    seo_desc: seo_desc || seoDesc || "",
    focus_keyword: focus_keyword || focusKeyword || "",
    canonical_url: canonical_url || canonicalUrl || "",
    featured_image: featured_image || featuredImage || null
  };

  return { id, payload };
}

export async function GET(request) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });

  if (status && status !== "All statuses") {
    query = query.eq("status", status);
  }
  if (category && category !== "All categories") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();
  const { payload } = formatBlogPayload(body);

  const { data, error } = await supabase
    .from("blog_posts")
    .insert([payload])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();
  const { id, payload } = formatBlogPayload(body);

  if (!id) {
    return NextResponse.json({ error: "Missing article ID for update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
