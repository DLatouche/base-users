import { stubsRoot } from '@adonisjs/core'
import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Files extends BaseCommand {
  static commandName = 'make:files'
  static description = 'Create controller, service, validator, migration, model files.'

  static options: CommandOptions = {}

  @args.spread({
    description:
      'Name of the file; Add options like m(model), c(controller), s(service), v(validator), d(migration), blank or all for all(mcsvd)',
  })
  declare data: string[]

  static settings = {
    loadApp: true,
  }

  async run() {
    const name = this.data[0]
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)

    let options = this.data[1]
    if (options === 'all' || !options) options = 'mcsvd'

    if (options.includes('m')) {
      const codemods = await this.createCodemods()
      const type = 'model'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${name}`,
        nameUpper,
        path: this.app.makePath(`app/${type}s/`, `${name}.ts`),
      })
    }
    if (options.includes('s')) {
      const codemods = await this.createCodemods()
      const type = 'service'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${name}`,
        nameUpper,
        path: this.app.makePath(`app/${type}s/`, `${name}.${type}.ts`),
      })
    }
    if (options.includes('v')) {
      const codemods = await this.createCodemods()
      const type = 'validator'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${name}`,
        nameUpper,
        path: this.app.makePath(`app/${type}s/`, `${name}.${type}.ts`),
      })
    }
    if (options.includes('c')) {
      const codemods = await this.createCodemods()
      const type = 'controller'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${name}`,
        nameUpper,
        path: this.app.makePath(`app/${type}s/`, `${name}.${type}.ts`),
      })
    }
    if (options.includes('d')) {
      const codemods = await this.createCodemods()
      const type = 'migration'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${name}`,
        nameUpper,
        path: this.app.makePath(`database/${type}s/`, `${Date.now()}_create_${name}_table.ts`),
      })
    }
  }
}
