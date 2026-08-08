create or replace function public.notify_form_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://nihylsfrwtgaupbbjmdq.supabase.co/functions/v1/notify-form-submission',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', '5797a25811941cff839474f2cc772cce902496abbf1befb4'
    ),
    body := jsonb_build_object(
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW)
    )
  );
  return NEW;
end;
$$;
