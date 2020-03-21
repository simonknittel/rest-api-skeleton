export function filterUser(item) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    email: item.email,
    permissionRole: item.permissionRole,
    whitelistedPermissions: item.whitelistedPermissions,
    blacklistedPermissions: item.blacklistedPermissions,
    emailVerified: item.emailVerified,
  }
}
