import { inject } from '@adonisjs/core'
import AuthsService from '#services/auths.service'

@inject()
export default class AuthsController {
  constructor(private authsService: AuthsService) {}
}
