
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AnipubSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AnipubSDK.test()
    equal(testsdk instanceof AnipubSDK, true,
      'AnipubSDK.test() must return a client synchronously')
  })

})
