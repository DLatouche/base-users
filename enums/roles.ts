export const roles = {
  admin: { id: 'adminId', name: 'Admin' },
  user: { id: 'userId', name: 'User' },
} as const

export type Role = (typeof roles)[keyof typeof roles]
