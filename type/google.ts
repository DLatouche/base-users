import { GoogleToken } from '@adonisjs/ally/types'

export type GoogleUser = {
  token: GoogleToken
  id: any
  nickName: any
  name: string
  email: string
  avatarUrl: any
  emailVerificationState: 'verified' | 'unverified'
  original: any
}
