export default function robotsTxtRoute(req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
}
