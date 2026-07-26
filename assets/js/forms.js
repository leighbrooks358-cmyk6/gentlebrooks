import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://nihylsfrwtgaupbbjmdq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BJwmqJJ7xMD2iCmU4vpLiA_QRhgGpqn';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function showFormStatus(form, message, isError) {
  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status form-note';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
  }
  status.textContent = message;
  status.style.color = isError ? '#B3261E' : 'var(--accent-dark)';
  status.style.fontWeight = '600';
}

function wireBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      care_for: data.get('care_for'),
      frequency: data.get('frequency'),
      hospice_status: data.get('hospice_status'),
      notes: data.get('notes'),
    };

    const { error } = await supabase.from('booking_requests').insert(payload);

    if (error) {
      showFormStatus(form, "Something went wrong sending your request — please call us instead at (253) 326-7210.", true);
      submitBtn.disabled = false;
    } else {
      showFormStatus(form, "Thanks — your booking request was received. We'll follow up within one business day.", false);
      form.reset();
      submitBtn.disabled = false;
    }
  });
}

function wireContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    };

    const { error } = await supabase.from('contact_messages').insert(payload);

    if (error) {
      showFormStatus(form, "Something went wrong sending your message — please call us instead at (253) 326-7210.", true);
      submitBtn.disabled = false;
    } else {
      showFormStatus(form, "Thanks — your message was received. We'll get back to you soon.", false);
      form.reset();
      submitBtn.disabled = false;
    }
  });
}

wireBookingForm();
wireContactForm();
