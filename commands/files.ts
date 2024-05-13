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
    // This is a command for creating files according to the project convention, it's a basic command that can be greatly improved.
    // ex: node ace make:files roles dm
    // need to create migration and model file

    // different name options (ex: for model we need singular name)
    const name = this.data[0]
    const singularName = name.charAt(name.length - 1) === 's' ? name.slice(0, -1) : name
    const singularNameUpper = singularName.charAt(0).toUpperCase() + singularName.slice(1)
    const pluralName = name.charAt(name.length - 1) === 's' ? name : `${name}s`
    const pluralNameUpper = pluralName.charAt(0).toUpperCase() + pluralName.slice(1)

    let options = this.data[1]
    if (options === 'all' || !options) options = 'mcsvd'

    if (options.includes('m')) {
      const codemods = await this.createCodemods()
      const type = 'model'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${singularName}`,
        nameUpper: singularNameUpper,
        path: this.app.makePath(`app/${type}s/`, `${singularName}.ts`),
      })
    }
    if (options.includes('s')) {
      const codemods = await this.createCodemods()
      const type = 'service'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${pluralName}`,
        nameUpper: pluralNameUpper,
        path: this.app.makePath(`app/${type}s/`, `${pluralName}.${type}.ts`),
      })
    }
    if (options.includes('v')) {
      const codemods = await this.createCodemods()
      const type = 'validator'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${pluralName}`,
        nameUpper: pluralNameUpper,
        path: this.app.makePath(`app/${type}s/`, `${pluralName}.${type}.ts`),
      })
    }
    if (options.includes('c')) {
      const codemods = await this.createCodemods()
      const type = 'controller'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${pluralName}`,
        nameUpper: pluralNameUpper,
        path: this.app.makePath(`app/${type}s/`, `${pluralName}.${type}.ts`),
      })
    }
    if (options.includes('d')) {
      const codemods = await this.createCodemods()
      const type = 'migration'
      await codemods.makeUsingStub(stubsRoot, `../commands/stubs/${type}.stub`, {
        name: `${pluralName}`,
        nameUpper: pluralNameUpper,
        path: this.app.makePath(
          `database/${type}s/`,
          `${Date.now()}_create_${pluralName}_table.ts`
        ),
      })
    }
  }
}
