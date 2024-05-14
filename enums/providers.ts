export const providers = {
  email: 'email',
  google: 'google',
} as const

export type Provider = (typeof providers)[keyof typeof providers]
