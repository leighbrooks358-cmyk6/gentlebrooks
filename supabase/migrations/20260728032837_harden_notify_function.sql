select vault.create_secret(
  '5797a25811941cff839474f2cc772cce902496abbf1befb4',
  'form_notify_webhook_secret',
  'Webhook secret sent to the notify-form-submission edge function'
);

create or replace function public.notify_form_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_secret text;
begin
  select decrypted_secret into webhook_secret
  from vault.decrypted_secrets
  where name = 'form_notify_webhook_secret';

  perform net.http_post(
    url := 'https://nihylsfrwtgaupbbjmdq.supabase.co/functions/v1/notify-form-submission',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', webhook_secret
    ),
    body := jsonb_build_object(
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW)
    )
  );
  return NEW;
end;
$$;

revoke execute on function public.notify_form_submission() from public;
revoke execute on function public.notify_form_submission() from anon, authenticated;
