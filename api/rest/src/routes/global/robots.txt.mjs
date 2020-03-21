export default function robotsTxtRoute(req, res) {
  res
    .type('text/plain')
    .send('User-agent: *\nDisallow: /')
}
