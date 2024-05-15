
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createAccountsValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape()
  })
)
export type CreateAccounts = Infer<typeof createAccountsValidator>