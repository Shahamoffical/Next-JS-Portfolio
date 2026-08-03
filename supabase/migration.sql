-- ============================================
-- Shaham Abbas Dev Portfolio — Safe Idempotent Migration SQL
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  category TEXT,
  status TEXT DEFAULT 'Draft',
  leads INTEGER DEFAULT 0,
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Auth insert projects" ON projects;
DROP POLICY IF EXISTS "Auth update projects" ON projects;
DROP POLICY IF EXISTS "Auth delete projects" ON projects;

CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Auth insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');


-- 2. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  author TEXT DEFAULT 'Admin',
  views TEXT DEFAULT '0',
  status TEXT DEFAULT 'Draft',
  content TEXT,
  tags TEXT,
  excerpt TEXT,
  faqs TEXT,
  seo_title TEXT,
  seo_desc TEXT,
  focus_keyword TEXT,
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT false,
  featured_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth update posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth delete posts" ON blog_posts;

CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth insert posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update posts" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete posts" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');


-- 3. PAGES TABLE
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  live_url TEXT,
  status TEXT DEFAULT 'Published',
  content TEXT,
  meta_title TEXT,
  meta_desc TEXT,
  banner_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read pages" ON pages;
DROP POLICY IF EXISTS "Auth insert pages" ON pages;
DROP POLICY IF EXISTS "Auth update pages" ON pages;
DROP POLICY IF EXISTS "Auth delete pages" ON pages;

CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Auth insert pages" ON pages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update pages" ON pages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete pages" ON pages FOR DELETE USING (auth.role() = 'authenticated');


-- 4. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  product TEXT,
  source TEXT,
  type TEXT DEFAULT 'General',
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public insert leads" ON leads;
DROP POLICY IF EXISTS "Auth read leads" ON leads;
DROP POLICY IF EXISTS "Auth update leads" ON leads;
DROP POLICY IF EXISTS "Auth delete leads" ON leads;

CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth update leads" ON leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete leads" ON leads FOR DELETE USING (auth.role() = 'authenticated');


-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published reviews" ON reviews;
DROP POLICY IF EXISTS "Auth full access reviews" ON reviews;

CREATE POLICY "Public read published reviews" ON reviews FOR SELECT USING (status = 'Published');
CREATE POLICY "Auth full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');


-- 6. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read settings" ON settings;
DROP POLICY IF EXISTS "Auth update settings" ON settings;

CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Auth update settings" ON settings FOR ALL USING (auth.role() = 'authenticated');


-- 7. STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read media" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload media" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete media" ON storage.objects;

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');


-- 8. AUTO-UPDATE updated_at TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS pages_updated_at ON pages;
DROP TRIGGER IF EXISTS settings_updated_at ON settings;

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
