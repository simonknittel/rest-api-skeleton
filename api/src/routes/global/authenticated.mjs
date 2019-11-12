export default function authenticatedRoute(req, res) {
  const filteredUser = {
    id: res.locals.authentication.id,
    email: res.locals.authentication.email,
    permissionRole: res.locals.authentication.permissionRole,
    whitelistedPermissions: res.locals.authentication.whitelistedPermissions,
    blacklistedPermissions: res.locals.authentication.blacklistedPermissions,
    emailVerified: res.locals.authentication.emailVerified,
    createdAt: res.locals.authentication.createdAt,
    updatedAt: res.locals.authentication.updatedAt,
  }

  res.send(filteredUser)
}
