// Runs before every request. Visitors who arrive on the old domain
// (nakkarchitecture.com) or on www are sent to the main address,
// nakkarchitects.com, on the same page. Everything else passes through.
const MAIN_HOST = 'nakkarchitects.com'
const REDIRECT_HOSTS = new Set([
  'www.nakkarchitects.com',
  'nakkarchitecture.com',
  'www.nakkarchitecture.com'
])

export async function onRequest(context) {
  const url = new URL(context.request.url)
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = 'https:'
    url.hostname = MAIN_HOST
    url.port = ''
    return Response.redirect(url.toString(), 301)
  }
  return context.next()
}
