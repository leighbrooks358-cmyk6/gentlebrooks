# Gentle Brooks

## Database (Supabase)

Project: **Gentle Brooks** (`nihylsfrwtgaupbbjmdq`, region `ca-central-1`, Postgres 17)

- Project URL: `https://nihylsfrwtgaupbbjmdq.supabase.co`
- Publishable (anon) key: `sb_publishable_BJwmqJJ7xMD2iCmU4vpLiA_QRhgGpqn`

Use these two values as `SUPABASE_URL` / `SUPABASE_ANON_KEY` (or equivalent) in any client app that submits to the tables below. Both tables only grant `INSERT` to the `anon` role — there is no public read/update/delete access.

Schema is version-controlled in [`supabase/migrations`](./supabase/migrations).

### Schema: `public`

#### `booking_requests`
Row Level Security: enabled

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | no | `gen_random_uuid()` |
| created_at | timestamptz | no | `now()` |
| name | text | no | |
| phone | text | no | |
| email | text | no | |
| care_for | text | yes | |
| frequency | text | yes | |
| hospice_status | text | yes | |
| notes | text | yes | |

Primary key: `id`

#### `contact_messages`
Row Level Security: enabled

| Column | Type | Nullable | Default |
|---|---|---|---|
| id | uuid | no | `gen_random_uuid()` |
| created_at | timestamptz | no | `now()` |
| name | text | no | |
| email | text | no | |
| message | text | no | |

Primary key: `id`
