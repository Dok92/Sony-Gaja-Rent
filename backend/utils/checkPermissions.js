import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return

  throw new UnAuthenticatedError('Niste autorizovani za ovu akciju')
}

export default checkPermissions
