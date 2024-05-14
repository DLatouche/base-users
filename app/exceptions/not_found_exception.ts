import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static status = 404
  static code = 'E_NOT_FOUND'
}
