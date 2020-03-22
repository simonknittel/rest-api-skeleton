import errorBasics from '../../../shared/errorBasics.mjs'

export default function error(err, res) {
  const rtn = errorBasics(err)

  res
    .status(rtn.status)
    .json({ error: rtn })
}
