const SUPABASE_URL = 'https://nihylsfrwtgaupbbjmdq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BJwmqJJ7xMD2iCmU4vpLiA_QRhgGpqn';

async function insertRow(table, payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Insert into ${table} failed with status ${res.status}`);
  }
}

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

    try {
      await insertRow('booking_requests', payload);
      showFormStatus(form, "Thanks — your booking request was received. We'll follow up within one business day.", false);
      form.reset();
    } catch (err) {
      showFormStatus(form, "Something went wrong sending your request — please call us instead at (253) 465-6704.", true);
    } finally {
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

    try {
      await insertRow('contact_messages', payload);
      showFormStatus(form, "Thanks — your message was received. We'll get back to you soon.", false);
      form.reset();
    } catch (err) {
      showFormStatus(form, "Something went wrong sending your message — please call us instead at (253) 465-6704.", true);
    } finally {
      submitBtn.disabled = false;
    }
  });
}

wireBookingForm();
wireContactForm();
