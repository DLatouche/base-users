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
import DashboardController from '#controllers/dashboard.controller'
import UsersController from '#controllers/users.controller'
import AccountController from '#controllers/account.controller'

router.on('/').renderInertia('home')

router
  .group(() => {
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

        router.get('google/redirect', [AuthsController, 'googleRedirect'])
        router.get('google/callback', [AuthsController, 'googleCallback'])

        router.post('email/login', [AuthsController, 'emailLogin'])
        router.get('login', [AuthsController, 'showLogin'])
        router.get('login/admin', [AuthsController, 'showLogin'])
      })
      .use(middleware.guest())

    router.post('logout', [AuthsController, 'logout'])
  })
  .prefix('auth/')

router
  .group(() => {
    router.get('dashboard', [DashboardController, 'showDashboard'])
    router
      .group(() => {
        router.get('/', [UsersController, 'showUsers'])
        router.post('/', [UsersController, 'createUser'])
        router.get('/create', [UsersController, 'showCreateUser'])
        router.get('/edit/:userId', [UsersController, 'showEditUser'])
      })
      .prefix('users')
  })
  .prefix('admin/')
  .use(middleware.admin())

router
  .group(() => {
    router.get('/', [AccountController, 'showAccount'])
    router.patch('/', [AccountController, 'updateAccount'])
  })
  .prefix('account/')
  .use(middleware.auth())
