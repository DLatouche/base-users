import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const emailRegisterValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
    username: vine.string().minLength(3).trim().escape(),
    password: vine.string().minLength(8).escape(),
  })
)
export type EmailRegister = Infer<typeof emailRegisterValidator>

export const emailLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
    password: vine.string().minLength(8).escape(),
    captcha: vine.string().optional(),
  })
)
export type EmailLogin = Infer<typeof emailLoginValidator>

export const emailVerifyValidator = vine.compile(
  vine.object({
    token: vine.string().trim().escape(),
  })
)

export const requestResetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().escape(),
  })
)
export type RequestResetPassword = Infer<typeof requestResetPasswordValidator>

export const resetPasswordValidator = vine.compile(
  vine.object({
    token: vine.string().trim().escape(),
    password: vine.string().trim().escape(),
  })
)
export type ResetPassword = Infer<typeof resetPasswordValidator>
