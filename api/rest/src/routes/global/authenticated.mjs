import { filterUser } from "../../../../shared/filters.mjs"

export default function authenticatedRoute(req, res) {
  res.send(filterUser(res.locals.authentication))
}
