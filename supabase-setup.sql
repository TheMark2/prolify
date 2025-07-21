-- Create agencies table for storing real estate agency waitlist
CREATE TABLE IF NOT EXISTS agencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_agencies_email ON agencies(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_agencies_created_at ON agencies(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for the waitlist signup)
CREATE POLICY "Anyone can insert agencies" ON agencies
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading all agencies (you might want to restrict this later)
CREATE POLICY "Anyone can read agencies" ON agencies
  FOR SELECT USING (true);
