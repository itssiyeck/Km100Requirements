# Supabase Database Setup Guide

This folder contains the database schema and security rules for the Document Scanning & Management System based on your Lucidchart workflow.

## Steps to Setup Supabase:

1. Go to [Supabase](https://supabase.com/) and create a free project (or open an existing one).
2. In your Supabase project dashboard, navigate to **SQL Editor** in the left sidebar.
3. Click **New Query**.
4. To initialize tables and baseline schemas, copy and paste [`schema.sql`](file:///c:/Users/KM100%20-%201002/Documents/OJT/supabase/schema.sql) and click **Run**.
5. To seed or update the **official 7 Prescribed Requirements** and trigger automation, copy and run [`seed_requirements.sql`](file:///c:/Users/KM100%20-%201002/Documents/OJT/supabase/seed_requirements.sql).
6. Under **Project Settings -> API**, copy:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (keep private for backend)
7. Paste these values into the backend `.env` file located in `backend/.env`.

## Official System Requirements Seeded:
1. **Birth Certificate NSO/PSA (or Marriage Certificate)**: Official PSA/NSO copy *(For married women, bring Marriage Certificate)*
2. **Either: T.O.R / Diploma / ALS / Form 138 / Form 137**: Transcript of Records, College Diploma, ALS Certificate, Form 138, or Form 137
3. **Passport Size Pictures - 4pcs (White BG w/ Collar & Signature)**: Acid-based photo paper, with nametag & signature
4. **1x1 Picture - 4pcs (White BG w/ Collar & Signature)**: Acid-based photo paper, with nametag & signature
5. **Barangay Certificate**: Current valid Barangay Clearance / Residency Certificate
6. **Medical Certificate**: Medical Certificate & Chest X-RAY for SMAW; Medical Certificate for BPP, Driving & CSS NCII
7. **Long Brown Envelope (1pc) & Long White Folder (1pc)**: Physical filing supplies for clearance archiving

## Tables Created:
- `profiles`: Manages user roles (`admin` or `user`).
- `documents`: Stores document records ("Document Saved in System"), file URLs, scan status, and metadata.
- `audit_logs`: Keeps an audit trail of every scan, save, view, and edit event.

## Security (Row Level Security):
- Anyone can view saved documents (`View Scanned Form on Website`).
- Only verified users with the `admin` role can edit documents (`Edit Scanned Form File`).
