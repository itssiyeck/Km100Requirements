# Supabase Database Setup Guide

This folder contains the database schema and security rules for the Document Scanning & Management System based on your Lucidchart workflow.

## Steps to Setup Supabase:

1. Go to [Supabase](https://supabase.com/) and create a free project (or open an existing one).
2. In your Supabase project dashboard, navigate to **SQL Editor** in the left sidebar.
3. Click **New Query**.
4. Copy and paste the entire contents of [`schema.sql`](file:///c:/Users/KM100%20-%201002/Documents/OJT/supabase/schema.sql) into the query editor.
5. Click **Run** to execute the script.
6. Under **Project Settings -> API**, copy:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (keep private for backend)
7. Paste these values into the backend `.env` file located in `backend/.env`.

## Tables Created:
- `profiles`: Manages user roles (`admin` or `user`).
- `documents`: Stores document records ("Document Saved in System"), file URLs, scan status, and metadata.
- `audit_logs`: Keeps an audit trail of every scan, save, view, and edit event.

## Security (Row Level Security):
- Anyone can view saved documents (`View Scanned Form on Website`).
- Only verified users with the `admin` role can edit documents (`Edit Scanned Form File`).
