

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AnipubSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StreamingDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.StreamingDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'streaming_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ep","req":false,"short":"Episodes 2+ streaming links","type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"link","req":false,"short":"Episode 1 streaming link with src= prefix","type":"`$STRING`","index$":2},{"active":true,"name":"name","req":false,"short":"Anime name","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"streaming_detail","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":119,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /v1/api/details/{id}","json":"{\"operationId\":\"getStreamingLinks\",\"parameters\":[{\"description\":\"Anime ID\",\"example\":119,\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"local\":{\"ep\":[{\"link\":\"src=https://...\"},{\"link\":\"src=https://...\"}],\"link\":\"src=https://...\",\"name\":\"Black Clover\"}},\"schema\":{\"properties\":{\"local\":{\"properties\":{\"ep\":{\"description\":\"Episodes 2+ streaming links\",\"items\":{\"properties\":{\"link\":{\"description\":\"Episode streaming link with src= prefix. Array index 0 = Episode 2, index 1 = Episode 3, etc.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"link\":{\"description\":\"Episode 1 streaming link with src= prefix\",\"type\":\"string\"},\"name\":{\"description\":\"Anime name\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Streaming links for episodes\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Anime not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/api/details/{id}","segments":[{"lit":"v1"},{"lit":"api"},{"lit":"details"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.local`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"streaming_detail","name__orig":"streaming_detail","Name":"StreamingDetail","name_":"streaming_detail","name-":"streaming-detail","NAME":"STREAMING_DETAIL","index$":7}, {"active":true,"entity":"streaming_detail","key$":"BasicStreamingDetailFlow","kind":"basic","name":"BasicStreamingDetailFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"streaming_detail_ref01","srcdatavar":"streaming_detail_ref01_data","suffix":"_dt0"},"match":{"id":"streaming_detail01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-streaming_detail_ref01"}}],"index$":0}]}, 'StreamingDetail')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let streaming_detail_ref01_data = Object.values(setup.data.existing.streaming_detail)[0] as any

    // LOAD
    const streaming_detail_ref01_ent = client.StreamingDetail()
    const streaming_detail_ref01_match_dt0: any = {}
    streaming_detail_ref01_match_dt0.id = streaming_detail_ref01_data.id
    const streaming_detail_ref01_data_dt0 = (await streaming_detail_ref01_ent.load(streaming_detail_ref01_match_dt0)).data()
    assert(streaming_detail_ref01_data_dt0.id === streaming_detail_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/streaming_detail/StreamingDetailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AnipubSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['streaming_detail01','streaming_detail02','streaming_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_STREAMING_DETAIL_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_STREAMING_DETAIL_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_STREAMING_DETAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AnipubSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ANIPUB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
