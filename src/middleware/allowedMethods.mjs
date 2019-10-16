export default function allowedMethods(methods) {
  return (req, res, next) => {
    if (methods.indexOf(req.method) < 0) {
      res
        .status(405)
        .set('Allow', methods.join(' '))
        .end()
      return
    }

    next()
  }
}
