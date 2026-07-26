# Gentle Brooks Bathing Service — Website

A simple static website: home, services, pricing, about, booking, and contact pages.

## Structure

```
index.html
services.html
pricing.html
about.html
booking.html
contact.html
assets/css/style.css
assets/js/main.js       (nav, scroll reveal)
assets/js/forms.js      (booking/contact form submission to Supabase)
assets/images/logo.svg   (full logo, used in header/footer)
assets/images/icon.svg   (icon only, used as favicon)
```

## Preview it locally

**Don't just double-click `index.html`** for booking.html/contact.html — the
booking and contact forms load as an ES module (`assets/js/forms.js`), and
Chrome (and most browsers) block module scripts from running over the
`file://` protocol via CORS. The form will silently fail to submit if opened
that way. Serve it over local HTTP instead:

```
cd gentle-brooks-bathing
python -m http.server 8080
```

Then open http://localhost:8080 — every page works fine over `file://`
except the forms specifically. Once deployed to Vercel this is a non-issue,
since it's served over real HTTP(S).

## Booking request form — done

`booking.html` and `contact.html` submit directly into a Supabase project
named **"Gentle Brooks"** (project ref `nihylsfrwtgaupbbjmdq`, region
ca-central-1) via `assets/js/forms.js`. Two tables: `booking_requests` and
`contact_messages`, both with row-level security enabled and an **insert-only**
policy for anonymous visitors — the publishable key embedded in `forms.js` is
safe to expose client-side (that's what it's for), since RLS blocks anyone
from reading other submissions through it. View submissions in the Supabase
dashboard → Table Editor, or query them there directly.

If you ever move off Supabase, `forms.js` is the only file that needs
replacing — the HTML forms just need `id="booking-form"` / `id="contact-form"`
kept in place.

## Still to connect: calendar and payments

### Live booking calendar (booking.html)

Create a free account at calendly.com, make an event type (e.g. "Free
Consultation"), and swap the placeholder box in `booking.html` for the real
Calendly embed code (instructions are commented directly in the file).

### Online payments (booking.html)

Create a free Stripe account, make a Payment Link for each service/package,
and replace the placeholder `href` in `booking.html`'s payment button with
your real Stripe Payment Link. Stripe hosts the secure checkout page — no
backend code needed.

## Deploying (GitHub + Vercel)

1. **GitHub**: create a new empty repo at github.com (no README/gitignore —
   keep it empty so there's nothing to merge). Then either:
   - Drag-and-drop all the files in this folder onto the repo's page in a
     browser (GitHub supports this for a repo with no commits yet), or
   - Install Git for Windows (`winget install --id Git.Git -e --source winget`)
     and run `git init`, `git add .`, `git commit -m "Initial site"`,
     `git remote add origin <your-repo-url>`, `git push -u origin main` from
     this folder.
2. **Vercel**: go to vercel.com → Add New → Project → Import your new GitHub
   repo. Vercel auto-detects it as a static site — no build command needed,
   just deploy. Every future push to GitHub auto-redeploys.

## Customizing

- Colors and fonts live in `assets/css/style.css` under the `:root` section.
- Phone number is set to the real number, (253) 326-7210. Email is still the
  placeholder `hello@gentlebrooksbathing.com` — replace with your real
  address everywhere (find & replace across all `.html` files) once you have
  a domain/mailbox for it.
- Replace the sample testimonials on `index.html` with real ones once you have them —
  they're clearly marked as placeholders in an HTML comment. Don't publish invented
  quotes/names as if they're real client feedback.
- Swap in real photos in `assets/images/` when available — currently the site
  uses the logo/icon only, no stock photography.

## Before you operate this business (not just the website)

### State licensing — Washington State (253 area code)

Washington requires a **Home Care Agency license** through the WA Department
of Health for any agency providing in-home personal care (bathing, dressing,
toileting, hygiene) under WAC 246-335. To get licensed you need:

- Completion of the **In-Home Services Orientation Class** (certificate required — applications aren't processed without it)
- Proof of current **commercial general liability insurance** (WAC 246-335-320(2)(b))
- **Background checks** for staff processed through the DSHS Background Check Central Unit (BCCU) initially, then Washington State Patrol every two years
- **Disclosure statements** and criminal history checks for the on-site administrator and supervisor of direct care services

Separately, the individual caregivers you hire will generally need **Home
Care Aide (HCA) certification** from WA DOH — that's a personal
certification for the caregiver, distinct from your agency license.

If you ever want to contract with DSHS to serve Medicaid-eligible clients,
that's a separate contract on top of the base license, reviewed by your
local Area Agency on Aging.

Sources: [WA DOH – Home Care Agencies, License Requirements](https://doh.wa.gov/licenses-permits-and-certificates/facilities-z/home-care-agencies/license-requirements), [WA DOH – Home Care Aide Certification Requirements](https://doh.wa.gov/licenses-permits-and-certificates/professions-new-renew-or-update/home-care-aide/certification-requirements), [Home Care Association of Washington](https://hcaw.org/doh-licensing-home-care-agencies/)

(If you're not actually operating out of the 253 area code / Washington State, let me know and I'll pull the right state's requirements instead.)

### How this fits alongside hospice

If a client is already enrolled in Medicare hospice, personal care/bathing
from a hospice aide is typically covered 100% by the Medicare Hospice
Benefit through their hospice provider
([Medicare.gov](https://www.medicare.gov/coverage/hospice-care),
[Medicare Interactive](https://www.medicareinteractive.org/get-answers/medicare-covered-services/hospice/hospice-costs-and-coverage)).
Positioning this service as a *replacement* for that could be misleading —
it's framed on the site as a *supplement*: extra visits beyond the hospice
aide's schedule, more dedicated one-on-one time, or care for bedridden
clients not currently on hospice. Keep that framing consistent in any
future marketing copy.

### Pricing

`pricing.html` uses the owner's actual committed rates.

**Bath packages** (tier structure, not independently market-sourced — built
by analogy to comparable personal-care add-on pricing, where extras like
shampoo/shave/nail-trim typically run $10–30 each; see
[Silver Strands salon pricing](https://www.silverstrandsvb.com/in-home-services)
and [Hair We Go senior grooming pricing](https://hairwegohouston.com/services/)):

- **Basic Bath — $95**: full in-bed bath, shampoo/soap/supplies included, skin check, fresh linens (~45–60 min)
- **Deluxe Bath — $120**: adds lotion massage, hair conditioning, fingernail trim (~75–90 min)
- **Supreme Bath — $145**: adds full nail care, shave/grooming, aromatherapy, oral comfort care (~90–120 min)

Note: Supreme ($145) sits only $5 below the 2-Baths-a-Week plan ($150) —
worth revisiting if that feels too close once real bookings come in.

**Recurring plans** (based on the Basic Bath tier — visits can be upgraded
to Deluxe/Supreme for the price difference):

- **2 Baths a Week — $150/week** (a ~21% discount vs. two Basic visits at
  $95 each, i.e. $75/visit at that frequency)
- Custom quote for 3+ visits/week or daily care

For reference, Washington is one of the higher-cost states for in-home
care — statewide median for home health aide / non-medical caregiver
services runs around **$42/hr** (vs. ~$34/hr national median), and licensed
agency rates across Seattle/Tacoma/Pierce County typically run $40–55/hr
([CareScout Cost of Care](https://www.carescout.com/cost-of-care), [Acti-Kare WA cost breakdown](https://inhomecarewashington.com/understanding-the-cost-of-home-care-in-washington-state/)).
A $95 flat-fee Basic visit (45–75 min) lands roughly in that hourly range
or a bit above it — reasonable for a specialized bed-bath/hospice service.
