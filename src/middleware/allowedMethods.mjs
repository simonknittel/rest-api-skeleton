export default function allowedMethods(methods) {
  return (req, res, next) => {
    if (methods.indexOf(req.method) < 0) {
      res.status(405)
      res.set('Allow', methods.join(' '))
      res.end()
      return
    }

    next()
  }
}
