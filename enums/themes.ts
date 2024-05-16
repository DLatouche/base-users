export const themes = {
  blue: 'theme-blue',
  lightBlue: 'theme-light-blue',
  green: 'theme-green',
  purple: 'theme-purple',
} as const

export type Theme = (typeof themes)[keyof typeof themes]
