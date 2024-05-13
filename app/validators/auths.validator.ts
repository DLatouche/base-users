
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createAuthsValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape()
  })
)
export type CreateAuths = Infer<typeof createAuthsValidator>