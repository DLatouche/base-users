/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthsController from '#controllers/auths.controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home')

router
  .group(() => {
    router.get('register', [AuthsController, 'showRegister'])
  })
  .prefix('auth/')
  .use(middleware.guest())
