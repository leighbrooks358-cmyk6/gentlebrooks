# Gentle Brooks

## Database (Supabase)

Project: **Gentle Brooks** (`nihylsfrwtgaupbbjmdq`, region `ca-central-1`, Postgres 17)

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
