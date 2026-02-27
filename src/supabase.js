
  // src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afrmbtwhwtztpvjtgamd.supabase.co';  // من الـ dashboard
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcm1idHdod3R6dHB2anRnYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTI4NzQsImV4cCI6MjA3OTc2ODg3NH0.sF-KYGjcvFb76FSc7JdKEFV86DyW8PR9bLveid6zN40';  // من الـ dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);