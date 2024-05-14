import { Exception } from '@adonisjs/core/exceptions'

export default class AlreadyExistException extends Exception {
  static status = 401
  static code = 'E_ALREADY_EXIST'
}
