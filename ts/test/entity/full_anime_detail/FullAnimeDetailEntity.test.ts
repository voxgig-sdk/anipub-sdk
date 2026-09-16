

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


describe('FullAnimeDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.FullAnimeDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'full_anime_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"characters","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"jikan","req":false,"short":"MyAnimeList data from Jikan API","type":"`$OBJECT`","index$":2},{"active":true,"name":"local","req":false,"type":"`$OBJECT`","index$":3}],"id":{"field":"id","name":"id"},"name":"full_anime_detail","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":119,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /anime/api/details/{id}","json":"{\"operationId\":\"getFullDetails\",\"parameters\":[{\"description\":\"Anime ID\",\"example\":119,\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"characters\":{\"items\":{\"properties\":{\"character\":{\"properties\":{\"image_url\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"role\":{\"description\":\"Character role (e.g., Main, Supporting)\",\"type\":\"string\"},\"voice_actors\":{\"items\":{\"properties\":{\"language\":{\"type\":\"string\"},\"person\":{\"properties\":{\"image_url\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"jikan\":{\"description\":\"MyAnimeList data from Jikan API\",\"properties\":{\"popularity\":{\"type\":\"integer\"},\"rank\":{\"type\":\"integer\"},\"score\":{\"type\":\"number\"},\"scored_by\":{\"type\":\"integer\"},\"synopsis\":{\"type\":\"string\"}},\"type\":\"object\"},\"local\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Full anime details including MAL data and characters\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Anime not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/anime/api/details/{id}","segments":[{"lit":"anime"},{"lit":"api"},{"lit":"details"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"full_anime_detail","name__orig":"full_anime_detail","Name":"FullAnimeDetail","name_":"full_anime_detail","name-":"full-anime-detail","NAME":"FULL_ANIME_DETAIL","index$":2}, {"active":true,"entity":"full_anime_detail","key$":"BasicFullAnimeDetailFlow","kind":"basic","name":"BasicFullAnimeDetailFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"full_anime_detail_ref01","srcdatavar":"full_anime_detail_ref01_data","suffix":"_dt0"},"match":{"id":"full_anime_detail01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-full_anime_detail_ref01"}}],"index$":0}]}, 'FullAnimeDetail')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let full_anime_detail_ref01_data = Object.values(setup.data.existing.full_anime_detail)[0] as any

    // LOAD
    const full_anime_detail_ref01_ent = client.FullAnimeDetail()
    const full_anime_detail_ref01_match_dt0: any = {}
    full_anime_detail_ref01_match_dt0.id = full_anime_detail_ref01_data.id
    const full_anime_detail_ref01_data_dt0 = (await full_anime_detail_ref01_ent.load(full_anime_detail_ref01_match_dt0)).data()
    assert(full_anime_detail_ref01_data_dt0.id === full_anime_detail_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/full_anime_detail/FullAnimeDetailTestData.json')

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
    ['full_anime_detail01','full_anime_detail02','full_anime_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID']
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
  
