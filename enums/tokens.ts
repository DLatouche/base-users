export const tokens = {
  verifyEmail: 'verifyEmail',
  resetPassword: 'resetPassword',
} as const

export type Token = (typeof tokens)[keyof typeof tokens]
