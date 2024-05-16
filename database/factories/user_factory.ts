import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { roles } from '../../enums/roles.js'
import { cuid } from '@adonisjs/core/helpers'
import Setting from '#models/setting'
import Auth from '#models/auth'
import { providers } from '../../enums/providers.js'

export const SettingFactory = factory
  .define(Setting, async () => {
    return {
      id: cuid(),
      userId: undefined,
    }
  })
  .build()

export const AuthFactory = factory
  .define(Auth, async ({ faker }) => {
    return {
      id: cuid(),
      providerId: faker.internet.email(),
      providerName: providers.email,
      password: faker.internet.password(),
      userId: undefined,
    }
  })
  .build()

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      id: cuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: 'avatar_1',
      emailVerified: false,
      roleId: roles.user.id,
    }
  })
  .after('create', async (_factory, user, ctx) => {
    await user.related('setting').create(await SettingFactory.make())
    await user.related('auths').create(
      await AuthFactory.merge({
        providerId: user.email,
        providerName: 'email',
        password: ctx.faker.internet.password(),
      }).make()
    )
  })
  .build()
