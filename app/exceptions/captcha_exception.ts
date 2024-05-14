import { Exception } from '@adonisjs/core/exceptions'

export default class CaptchaException extends Exception {
  static status = 401
  static code = 'E_CAPTCHA_EXCEPTION'
}
