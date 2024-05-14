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
    router.get('registered', [AuthsController, 'showRegistered'])
    router.post('email/register', [AuthsController, 'emailRegister']).use(middleware.captcha())

    router.get('email/verify', [AuthsController, 'verifyEmail'])
    router.get('email/verifyError', [AuthsController, 'showVerifyError'])

    router.get('email/requestResetPassword', [AuthsController, 'showRequestResetPassword'])
    router
      .post('email/requestResetPassword', [AuthsController, 'requestResetPassword'])
      .use(middleware.captcha())
    router.get('email/resetPassword', [AuthsController, 'showResetPassword'])
    router.post('email/resetPassword', [AuthsController, 'resetPassword'])
  })
  .prefix('auth/')
  .use(middleware.guest())
