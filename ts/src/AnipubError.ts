
import { Context } from './Context'


class AnipubError extends Error {

  isAnipubError = true

  sdk = 'Anipub'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AnipubError
}

