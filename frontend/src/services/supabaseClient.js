import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://huhdxgzwtazqxjirwgby.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aGR4Z3p3dGF6cXhqaXJ3Z2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTUwNzYsImV4cCI6MjExMDQ3MTA3Nn0.fZECAjsLcqc2i7GME8cSaKBURqY9zSsxrf3p3RQBxvg';
const PUBLISHABLE_KEY = 'sb_publishable_lN2qNPC4zS4HbK6SX_cUog_P44kkLdi';

// Robust URL Sanitizer: ensures strict origin URL without paths or query parameters
const sanitizeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return DEFAULT_SUPABASE_URL;
  let clean = rawUrl.trim();
  const dashMatch = clean.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/i);
  if (dashMatch) {
    return `https://${dashMatch[1]}.supabase.co`;
  }
  try {
    const urlObj = new URL(clean.startsWith('http') ? clean : 'https://' + clean);
    return urlObj.origin;
  } catch (e) {
    return DEFAULT_SUPABASE_URL;
  }
};

// Reads from environment variables or localStorage (Web)
const getCredentials = () => {
  let url = process.env.EXPO_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  let key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

  if (typeof window !== 'undefined' && window.localStorage) {
    url = window.localStorage.getItem('sb_project_url') || url;
    key = window.localStorage.getItem('sb_anon_key') || key;
  }

  url = sanitizeUrl(url);

  // Automatically heal corrupted localStorage URL & key in the browser
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('sb_project_url', url);
    window.localStorage.setItem('sb_anon_key', key || DEFAULT_SUPABASE_KEY);
  }

  return {
    url,
    key: (key && key.trim()) || DEFAULT_SUPABASE_KEY
  };
};

const creds = getCredentials();
export const supabase = createClient(creds.url, creds.key);
