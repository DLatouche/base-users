import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const editUserBouncer = Bouncer.ability((currentUser: User, userEdited: User) => {
  // only the user can edit their own profile or an admin can edit any profile
  return currentUser.isAdmin || currentUser.id === userEdited.id
})

export const usersAdminBouncer = Bouncer.ability((currentUser: User) => {
  return currentUser.isAdmin
})
