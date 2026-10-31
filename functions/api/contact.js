// Cloudflare Pages Function: POST /api/contact
//
// Receives the contact form as JSON, checks it, and emails it to the studio
// through Resend's HTTP API. Secrets live in Cloudflare environment variables,
// never in the repo:
//   RESEND_API_KEY      (secret)  Resend API key
//   CONTACT_TO_EMAIL    (plain)   where messages are delivered
//   CONTACT_FROM_EMAIL  (plain, optional) sender, e.g. "NAKK Website <contact@nakkarchitecture.com>"
//                       Defaults to Resend's test sender until the domain is verified.

const SUBJECT_LABELS = {
  'new-project': 'New Project Inquiry',
  consultation: 'Consultation Request',
  partnership: 'Partnership Opportunity',
  general: 'General Question',
  other: 'Other'
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  })

// Strip line breaks so user input can never inject extra email headers.
const oneLine = (value, max) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)

export async function onRequestPost({ request, env }) {
  // Only accept submissions that come from this site.
  const origin = request.headers.get('Origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: 'Forbidden' }, 403)
  }

  let data
  try {
    data = await request.json()
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }

  // Honeypot: real visitors never see this field. Pretend success for bots.
  if (data.botField) return json({ ok: true })

  const name = oneLine(data.name, 120)
  const email = oneLine(data.email, 200)
  const phone = oneLine(data.phone, 60)
  const subjectKey = oneLine(data.subject, 40)
  const message = String(data.message ?? '').trim().slice(0, 5000)

  if (!name || !EMAIL_PATTERN.test(email) || !SUBJECT_LABELS[subjectKey] || message.length < 10) {
    return json({ error: 'Please check the form and try again.' }, 400)
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error('Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return json({ error: 'Contact form is not configured.' }, 500)
  }

  const subjectLabel = SUBJECT_LABELS[subjectKey]
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Subject: ${subjectLabel}`,
    '',
    message
  ].join('\n')

  let response
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || 'NAKK Website <onboarding@resend.dev>',
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[NAKK website] ${subjectLabel} from ${name}`,
        text
      })
    })
  } catch (error) {
    console.error('Could not reach Resend', error)
    return json({ error: 'Could not send your message.' }, 502)
  }

  if (!response.ok) {
    console.error('Resend error', response.status, await response.text())
    return json({ error: 'Could not send your message.' }, 502)
  }

  return json({ ok: true })
}

export const onRequest = () => json({ error: 'Method not allowed' }, 405)
