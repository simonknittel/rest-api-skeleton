export default function authenticatedRoute(req, res) {
  res.send(res.locals.authentication)
}
