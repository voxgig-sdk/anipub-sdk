

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


describe('FindEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Find()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'find.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ep":{"a":true,"h":"Ep","n":"ep","r":false,"sh":"Episode count if found","t":"`$INTEGER`","key$":"ep","index$":0},"exist":{"a":true,"h":"Exist","n":"exist","r":true,"sh":"Whether anime exists","t":"`$BOOLEAN`","key$":"exist","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Anime ID if found","t":"`$INTEGER`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"find","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/find/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"One Piece","k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/find/{name}","q":{"exist":["id"]},"r":{"param":{"name":"id"}},"s":[{"lit":"api"},{"lit":"find"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"find","name__orig":"find","Name":"Find","name_":"find","name-":"find","NAME":"FIND","index$":1}, {"active":true,"entity":"find","key$":"BasicFindFlow","kind":"basic","name":"BasicFindFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"find_ref01","srcdatavar":"find_ref01_data","suffix":"_dt0"},"m":{"id":"find01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-find_ref01"}}],"index$":0}]}, 'Find', {"GET /api/find/{name}":{"protocol":"http","operationId":"findAnimeByName","responses":{"200":{"description":"Anime found or not found response","content":{"application/json":{"schema":{"type":"object","properties":{"exist":{"type":"boolean","description":"Whether anime exists","key$":"exist"},"id":{"type":"integer","description":"Anime ID if found","key$":"id"},"ep":{"type":"integer","description":"Episode count if found","key$":"ep"}},"required":["exist"],"x-ref":"#/components/schemas/FindResult","index$":0},"examples":{"found":{"value":{"exist":true,"id":10,"ep":1155}},"notFound":{"value":{"exist":false}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"name","in":"path","required":true,"description":"URL-encoded anime name — spaces as %20","schema":{"type":"string"},"example":"One Piece","index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let find_ref01_data = Object.values(setup.data.existing.find)[0] as any

    // LOAD
    const find_ref01_ent = client.Find()
    const find_ref01_match_dt0: any = {}
    find_ref01_match_dt0.id = find_ref01_data.id
    const find_ref01_data_dt0 = (await find_ref01_ent.load(find_ref01_match_dt0)).data()
    assert(find_ref01_data_dt0.id === find_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/find/FindTestData.json')

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
    ['find01','find02','find03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_FIND_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_FIND_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_FIND_ENTID']
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
  
