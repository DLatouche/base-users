import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const updatedAccountValidator = vine.compile(
  vine.object({
    id: vine.string().trim().escape(),
    username: vine.string().trim().escape().optional(),
    avatar: vine.string().trim().escape().optional(),
    email: vine.string().trim().escape().optional(),
    password: vine.string().trim().escape().optional(),
    theme: vine.string().trim().escape().optional(),
  })
)
export type UpdatedAccountBase = Infer<typeof updatedAccountValidator>

export type UpdatedAccount = Omit<
  UpdatedAccountBase,
  'username' | 'avatar' | 'email' | 'password' | 'theme'
> & {
  username?: string
  avatar?: string
  email?: string
  password?: string
  theme?: string
}
