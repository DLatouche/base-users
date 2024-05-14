export const tokens = {
  verifyEmail: 'verifyEmail',
} as const

export type Token = (typeof tokens)[keyof typeof tokens]
