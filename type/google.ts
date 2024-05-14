import { GoogleToken } from '@adonisjs/ally/types'

export type GoogleUser = {
  token: GoogleToken
  id: any
  nickName: any
  name: any
  email: any
  avatarUrl: any
  emailVerificationState: 'verified' | 'unverified'
  original: any
}
