

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


describe('InfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Info()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"Aired","req":false,"short":"Air date range","type":"`$STRING`","index$":0},{"active":true,"name":"Cover","req":false,"short":"Cover image path or URL.","type":"`$STRING`","index$":1},{"active":true,"name":"DescripTion","req":false,"short":"Anime description","type":"`$STRING`","index$":2},{"active":true,"name":"Duration","req":false,"short":"Episode duration","type":"`$STRING`","index$":3},{"active":true,"name":"Genres","req":false,"short":"List of genres","type":"`$ARRAY`","index$":4},{"active":true,"name":"ImagePath","req":false,"short":"Image path or URL.","type":"`$STRING`","index$":5},{"active":true,"name":"MALScore","req":false,"short":"MyAnimeList score","type":"`$STRING`","index$":6},{"active":true,"name":"Name","req":false,"short":"Anime name","type":"`$STRING`","index$":7},{"active":true,"name":"Premiered","req":false,"short":"Premiere season","type":"`$STRING`","index$":8},{"active":true,"name":"RatingsNum","req":false,"short":"Number of ratings","type":"`$INTEGER`","index$":9},{"active":true,"name":"Status","req":false,"short":"Airing status","type":"`$STRING`","index$":10},{"active":true,"name":"Studios","req":false,"short":"Production studio","type":"`$STRING`","index$":11},{"active":true,"name":"Synonyms","req":false,"short":"Alternative names","type":"`$STRING`","index$":12},{"active":true,"name":"epCount","req":false,"short":"Episode count","type":"`$INTEGER`","index$":13},{"active":true,"name":"finder","req":false,"short":"Slug identifier","type":"`$STRING`","index$":14},{"active":true,"name":"id","req":false,"short":"Anime ID","type":"`$INTEGER`","index$":15}],"id":{"field":"id","name":"id"},"name":"info","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"black-clover","kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/info/{id}","json":"{\"operationId\":\"getAnimeInfo\",\"parameters\":[{\"description\":\"Numeric ID like 61 or slug like black-clover, one-piece, high-school-dxd\",\"example\":\"black-clover\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"Aired\":\"Oct 3, 2017 to Mar 30, 2021\",\"Cover\":\"https://...\",\"DescripTion\":\"...\",\"Duration\":\"25m\",\"Genres\":[\"action\",\"fantasy\",\"magic\"],\"ImagePath\":\"https://...\",\"MALScore\":\"8.88\",\"Name\":\"Black Clover\",\"Premiered\":\"Fall 2017\",\"RatingsNum\":45,\"Status\":\"Finished Airing\",\"Studios\":\"Pierrot\",\"Synonyms\":\"...\",\"_id\":61,\"epCount\":170},\"schema\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with anime metadata\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"No anime with that ID or name\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/info/{id}","segments":[{"lit":"api"},{"lit":"info"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"info","name__orig":"info","Name":"Info","name_":"info","name-":"info","NAME":"INFO","index$":3}, {"active":true,"entity":"info","key$":"BasicInfoFlow","kind":"basic","name":"BasicInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"info_ref01","srcdatavar":"info_ref01_data","suffix":"_dt0"},"match":{"id":"info01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-info_ref01"}}],"index$":0}]}, 'Info')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let info_ref01_data = Object.values(setup.data.existing.info)[0] as any

    // LOAD
    const info_ref01_ent = client.Info()
    const info_ref01_match_dt0: any = {}
    info_ref01_match_dt0.id = info_ref01_data.id
    const info_ref01_data_dt0 = (await info_ref01_ent.load(info_ref01_match_dt0)).data()
    assert(info_ref01_data_dt0.id === info_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/info/InfoTestData.json')

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
    ['info01','info02','info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_INFO_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_INFO_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_INFO_ENTID']
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
  
