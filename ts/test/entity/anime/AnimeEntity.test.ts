

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


describe('AnimeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Anime()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'anime.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Genre":{"a":true,"h":"Genre","n":"Genre","r":true,"sh":"Genre as string or array of strings","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"Genre","index$":0},"Name":{"a":true,"h":"Name","n":"Name","r":true,"sh":"Anime name to match","t":"`$STRING`","key$":"Name","index$":1},"exists":{"a":true,"h":"Exists","n":"exists","r":false,"t":"`$BOOLEAN`","key$":"exists","index$":2}},"name":"anime","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/check","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/check","q":{},"r":{},"s":[{"lit":"api"},{"lit":"check"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/getAll","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/getAll","q":{},"r":{},"s":[{"lit":"api"},{"lit":"getAll"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/getlast","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/getlast","q":{},"r":{},"s":[{"lit":"api"},{"lit":"getlast"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"anime","name__orig":"anime","Name":"Anime","name_":"anime","name-":"anime","NAME":"ANIME","index$":0}, {"active":true,"entity":"anime","key$":"BasicAnimeFlow","kind":"basic","name":"BasicAnimeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"anime_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"anime_ref01","srcdatavar":"anime_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-anime_ref01"}}],"index$":1}]}, 'Anime', {"POST /api/check":{"protocol":"http","operationId":"checkAnime","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["Name","Genre"],"properties":{"Name":{"type":"string","description":"Anime name to match","key$":"Name"},"Genre":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"description":"Genre as string or array of strings","key$":"Genre"}},"x-ref":"#/components/schemas/CheckRequest","index$":1},"examples":{"singleGenre":{"value":{"Name":"Black Clover","Genre":"Action"}},"multipleGenres":{"value":{"Name":"Jujutsu Kaisen","Genre":["Action","Drama"]}}}}}},"responses":{"200":{"description":"Check result","content":{"application/json":{"schema":{"type":"object","properties":{"exists":{"type":"boolean","key$":"exists"}},"index$":0}}}},"400":{"description":"Invalid request body","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/getAll":{"protocol":"http","operationId":"getTotalCount","responses":{"200":{"description":"Total number of anime in database","content":{"application/json":{"schema":{"type":"integer","example":153}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/getlast":{"protocol":"http","operationId":"getLastId","responses":{"200":{"description":"Last document ID","content":{"application/json":{"schema":{"type":"integer"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const anime_ref01_ent = client.Anime()
    let anime_ref01_data = setup.data.new.anime['anime_ref01']

    anime_ref01_data = (await anime_ref01_ent.create(anime_ref01_data)).data()
    assert(null != anime_ref01_data)


    // LOAD
    const anime_ref01_match_dt0: any = {}
    const anime_ref01_data_dt0 = (await anime_ref01_ent.load(anime_ref01_match_dt0)).data()
    assert(null != anime_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/anime/AnimeTestData.json')

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
    ['anime01','anime02','anime03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_ANIME_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_ANIME_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_ANIME_ENTID']
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
  
