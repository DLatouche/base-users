import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { roles } from '../../enums/roles.js'

const roleIds = Object.values(roles).map((role) => role.id)

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
    username: vine.string().minLength(3).trim().escape(),
    roleId: vine.string().in(roleIds).optional(),
    emailVerified: vine.boolean().optional(),
    avatar: vine.string().optional(),
  })
)
type CreateUserBase = Infer<typeof createUserValidator>

// Redefine the CreateUser type so that optional fields don't have to be defined (even to undefined).
export type CreateUser = Omit<CreateUserBase, 'roleId' | 'emailVerified' | 'avatar'> & {
  roleId?: string
  emailVerified?: boolean
  avatar?: string
}

export const getAllUsersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    orderBy: vine
      .string()
      .in(['id', 'username', 'emailVerified', 'email', 'lastConnextion', 'updatedAt'])
      .optional(),
    order: vine.string().in(['asc', 'desc']).optional(),
    searchQuery: vine.string().optional(),
  })
)
export type GetAllUsers = Infer<typeof getAllUsersValidator>
