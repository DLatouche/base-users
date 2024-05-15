import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createSettingsValidator = vine.compile(
  vine.object({
    userId: vine.string(),
    theme: vine.string().optional(),
    menuExpanded: vine.boolean().optional(),
  })
)
type CreateSettingsBase = Infer<typeof createSettingsValidator>

export type CreateSettings = Omit<CreateSettingsBase, 'theme' | 'menuExpanded'> & {
  menuExpanded?: boolean
  theme?: string
}
