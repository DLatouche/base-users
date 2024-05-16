import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { roles } from '../../enums/roles.js'
import { themes } from '../../enums/themes.js'

const roleIds = Object.values(roles).map((role) => role.id)
const themeValues = Object.values(themes)

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
    username: vine.string().minLength(3).trim().escape(),
    roleId: vine.string().in(roleIds).optional(),
    emailVerified: vine.boolean().optional(),
    avatar: vine.string().optional(),
    theme: vine.string().in(themeValues).optional(),
  })
)
type CreateUserBase = Infer<typeof createUserValidator>

// Redefine the CreateUser type so that optional fields don't have to be defined (even to undefined).
export type CreateUser = Omit<CreateUserBase, 'roleId' | 'emailVerified' | 'avatar' | 'theme'> & {
  roleId?: string
  emailVerified?: boolean
  avatar?: string
  theme?: string
}

export const createUserAdminValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
    username: vine.string().minLength(3).trim().escape(),
    roleId: vine.string().in(roleIds).optional(),
    avatar: vine.string().optional(),
    password: vine.string().minLength(8).escape(),
    theme: vine.string().in(themeValues).optional(),
  })
)
export type CreateUserAdmin = Infer<typeof createUserAdminValidator>

export const getAllUsersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    orderBy: vine
      .string()
      .in(['id', 'username', 'emailVerified', 'email', 'lastConnexion', 'updatedAt'])
      .optional(),
    order: vine.string().in(['asc', 'desc']).optional(),
    searchQuery: vine.string().optional(),
  })
)
export type GetAllUsers = Infer<typeof getAllUsersValidator>
