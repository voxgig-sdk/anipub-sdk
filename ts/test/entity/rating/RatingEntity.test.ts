

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


describe('RatingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Rating()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rating.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"Aired","req":false,"short":"Air date range","type":"`$STRING`","index$":0},{"active":true,"name":"Cover","req":false,"short":"Cover image path or URL.","type":"`$STRING`","index$":1},{"active":true,"name":"DescripTion","req":false,"short":"Anime description","type":"`$STRING`","index$":2},{"active":true,"name":"Duration","req":false,"short":"Episode duration","type":"`$STRING`","index$":3},{"active":true,"name":"Genres","req":false,"short":"List of genres","type":"`$ARRAY`","index$":4},{"active":true,"name":"ImagePath","req":false,"short":"Image path or URL.","type":"`$STRING`","index$":5},{"active":true,"name":"MALScore","req":false,"short":"MyAnimeList score","type":"`$STRING`","index$":6},{"active":true,"name":"Name","req":false,"short":"Anime name","type":"`$STRING`","index$":7},{"active":true,"name":"Premiered","req":false,"short":"Premiere season","type":"`$STRING`","index$":8},{"active":true,"name":"RatingsNum","req":false,"short":"Number of ratings","type":"`$INTEGER`","index$":9},{"active":true,"name":"Status","req":false,"short":"Airing status","type":"`$STRING`","index$":10},{"active":true,"name":"Studios","req":false,"short":"Production studio","type":"`$STRING`","index$":11},{"active":true,"name":"Synonyms","req":false,"short":"Alternative names","type":"`$STRING`","index$":12},{"active":true,"name":"epCount","req":false,"short":"Episode count","type":"`$INTEGER`","index$":13},{"active":true,"name":"finder","req":false,"short":"Slug identifier","type":"`$STRING`","index$":14},{"active":true,"name":"id","req":false,"short":"Anime ID","type":"`$INTEGER`","index$":15}],"id":{"field":"id","name":"id"},"name":"rating","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /api/findbyrating","json":"{\"operationId\":\"findByRating\",\"parameters\":[{\"description\":\"Page number, default 1\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"AniData\":[{\"DescripTion\":\"...\",\"ImagePath\":\"https://...\",\"MALScore\":\"9.36\",\"Name\":\"Frieren: Beyond Journey's End\",\"RatingsNum\":50,\"_id\":2454,\"finder\":\"frieren-beyond-journeys-end\"}],\"currentPage\":1},\"schema\":{\"properties\":{\"AniData\":{\"description\":\"Array of top-rated anime\",\"items\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Paginated list of top-rated anime\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/findbyrating","segments":[{"lit":"api"},{"lit":"findbyrating"}],"select":{"exist":["page"]},"transform":{"req":"`reqdata`","res":"`body.AniData`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"rating","name__orig":"rating","Name":"Rating","name_":"rating","name-":"rating","NAME":"RATING","index$":5}, {"active":true,"entity":"rating","key$":"BasicRatingFlow","kind":"basic","name":"BasicRatingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"rating_ref01"}}],"index$":0}]}, 'Rating')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rating_ref01_data = Object.values(setup.data.existing.rating)[0] as any

    // LIST
    const rating_ref01_ent = client.Rating()
    const rating_ref01_match: any = {}

    const rating_ref01_list = (await rating_ref01_ent.list(rating_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rating/RatingTestData.json')

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
    ['rating01','rating02','rating03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_RATING_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_RATING_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_RATING_ENTID']
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
  
