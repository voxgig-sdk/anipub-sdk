
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AnipubSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AnipubSDK.test()
    equal(null !== testsdk, true)
  })

})
