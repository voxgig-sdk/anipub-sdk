

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ep":{"a":true,"h":"Ep","n":"ep","r":false,"sh":"Episodes 2+ streaming links","t":"`$ARRAY`","key$":"ep","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"link":{"a":true,"h":"Link","n":"link","r":false,"sh":"Episode 1 streaming link with src= prefix","t":"`$STRING`","key$":"link","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Anime name","t":"`$STRING`","key$":"name","index$":3}},"id":{"field":"id","name":"id"},"name":"streaming_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/api/details/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":119,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v1/api/details/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"v1"},{"lit":"api"},{"lit":"details"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.local`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"streaming_detail","name__orig":"streaming_detail","Name":"StreamingDetail","name_":"streaming_detail","name-":"streaming-detail","NAME":"STREAMING_DETAIL","index$":9}, {"active":true,"entity":"streaming_detail","key$":"BasicStreamingDetailFlow","kind":"basic","name":"BasicStreamingDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"streaming_detail_ref01","srcdatavar":"streaming_detail_ref01_data","suffix":"_dt0"},"m":{"id":"streaming_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-streaming_detail_ref01"}}],"index$":0}]}, 'StreamingDetail', {"GET /v1/api/details/{id}":{"protocol":"http","operationId":"getStreamingLinks","responses":{"200":{"description":"Streaming links for episodes","content":{"application/json":{"schema":{"type":"object","properties":{"local":{"type":"object","properties":{"name":{"type":"string","description":"Anime name","key$":"name"},"link":{"type":"string","description":"Episode 1 streaming link with src= prefix","key$":"link"},"ep":{"type":"array","items":{"type":"object","properties":{"link":{"type":"string","description":"Episode streaming link with src= prefix. Array index 0 = Episode 2, index 1 = Episode 3, etc."}}},"description":"Episodes 2+ streaming links","key$":"ep"}},"index$":0}},"x-ref":"#/components/schemas/StreamingDetails"},"example":{"local":{"name":"Black Clover","link":"src=https://...","ep":[{"link":"src=https://..."},{"link":"src=https://..."}]}}}}},"404":{"description":"Anime not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Anime ID","schema":{"type":"integer"},"example":119,"index$":0}],"securitySource":"unspecified"}})
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
  
